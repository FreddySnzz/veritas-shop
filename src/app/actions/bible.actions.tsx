"use server";

import * as cheerio from "cheerio";
import { 
  BibleChapterSearchResponse, 
  BibleSearchResponse 
} from "@/data/types/bible.type";

// https://www.bibliaonline.com.br/avm

export async function getBibleSearchData(searchText: string) {
  try {
    const rawData = await fetch(`https://padrepauloricardo.org/biblia/busca?q=${encodeURI(searchText)}`);
    const data: BibleSearchResponse = await rawData.json();
    return data;
  } catch (error: unknown) {
    console.error("Erro ao buscar texto:", error);
    throw new Error("Falha na consulta");
  }
}

export async function getBibleChapterData(
  book: string, 
  chapter: string
) {
  try {
    const url = `https://padrepauloricardo.org/biblia/${book}?cap=${chapter}&edition=matos-soares`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "pt-BR,pt;q=0.9",
        },
        next: { revalidate: 86400 } 
      })

      if (!response.ok) {
        throw new Error(`Falha ao buscar a página: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      const verses: BibleChapterSearchResponse[] = [];
      let isTargetChapter = false;
      let verseCounter = 1;

      const mainContent = $('#bible-main-content');

      mainContent.find('h3, div').each((_, element) => {
        const el = $(element);
        const tagName = element.tagName.toLowerCase();

        if (tagName === "h3") {
          const titleText = el.text().trim();
          if (titleText.endsWith(` ${chapter}`) || titleText.endsWith(`, ${chapter}`)) {
            isTargetChapter = true;
            verseCounter = 1;
          } else {
            isTargetChapter = false;
          }
        } else if (isTargetChapter && tagName === "div") {
          if (el.children('div').length === 0) {
            const verseText = el.text().replace(/\s+/g, ' ').trim();
            if (verseText.length > 10 && verseText !== "Evangelho") {
              verses.push({
                number: verseCounter++,
                text: verseText
              })
            }
          }
        }
      })

      return { success: true, verses };
    } catch (error) {
      console.error("Erro ao buscar capítulo:", error);
      return { 
        success: false, 
        verses: [], 
        error: "Não foi possível carregar os versículos." 
      }
    }
  } catch (error: unknown) {
    console.error("Erro ao buscar capítulo:", error);
    throw new Error("Falha na consulta");
  }
}