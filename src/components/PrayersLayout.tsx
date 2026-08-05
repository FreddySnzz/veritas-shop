'use client';

import Link from "next/link";
import { 
  commonPrayers, 
  various, 
  specificPrayers 
} from "@/data/constants/prayers";
import { CustomInput } from "./inputs/CustomInput";
import { useState } from "react";
import { removeAccentsAndSpaces } from "@/data/functions/removeAccentsAndSpaces";

export default function PrayersLayout() {
  const [searchText, setSearchText] = useState('');
  const prayers = [...commonPrayers, ...specificPrayers, ...various];
  const filteredData = prayers.filter((prayer) => 
    removeAccentsAndSpaces(prayer.title.toLowerCase())
      .includes(removeAccentsAndSpaces(searchText.toLowerCase()))
  );

  return (
    <section 
      id={'prayers'}
      className="w-full h-full font-sans"
    >
      <div className="flex overflow-y-auto font-sans scrollbar-hide">
        <div className="relative flex w-full items-center justify-center mb-4 md:gap-3">
          <CustomInput
            searchbarPlaceholder="Busque por oração"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="bg-white dark:bg-input/30 shadow-xs"
            clearButtonAction={() => setSearchText('')}
            withClearButton
          />
        </div>
      </div>

      {searchText.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <section 
            id="commom"
            className="flex flex-col gap-2"
          >
            <h1 className="font-bold text-secondary dark:text-zinc-200 text-2xl md:text-3xl">
              Principais
            </h1>
            <div className="flex flex-col">
              {commonPrayers.map((prayer, index) => (
                <Link
                  key={index}
                  aria-label={prayer.title}
                  title={prayer.title}
                  href={`/ajuda/oracoes${prayer.href}`}
                  className="w-fit"
                >
                  <p className="font-medium dark:text-zinc-400 hover:underline ml-2">
                    • {prayer.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section 
            id="specific-prayers"
            className="flex flex-col gap-2"
          >
            <h1 className="font-bold text-secondary dark:text-zinc-200 text-2xl md:text-3xl">
              Específicas
            </h1>
            <div className="flex flex-col">
              {specificPrayers.map((prayer, index) => (
                <Link
                  key={index}
                  aria-label={prayer.title}
                  title={prayer.title}
                  href={`/ajuda/oracoes${prayer.href}`}
                  className="w-fit"
                >
                  <p className="font-medium dark:text-zinc-400 hover:underline ml-2">
                    • {prayer.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section 
            id="various"
            className="flex flex-col gap-2"
          >
            <h1 className="font-bold text-secondary dark:text-zinc-200 text-2xl md:text-3xl">
              Diversas
            </h1>
            <div className="flex flex-col">
              {various.map((prayer, index) => (
                <Link
                  key={index}
                  aria-label={prayer.title}
                  title={prayer.title}
                  href={`/ajuda/oracoes${prayer.href}`}
                  className="w-fit"
                >
                  <p className="font-medium dark:text-zinc-400 hover:underline ml-2">
                    • {prayer.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col">
          {filteredData.map((prayer, index) => (
            <Link
              key={index}
              aria-label={prayer.title}
              title={prayer.title}
              href={`/ajuda/oracoes${prayer.href}`}
              className="w-fit"
            >
              <span className="font-medium dark:text-zinc-400 hover:underline ml-2">
                • {prayer.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};