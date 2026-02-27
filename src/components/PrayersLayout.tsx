import Link from "next/link";
import { 
  commonPrayers, 
  rosary, 
  specificPrayers 
} from "@/data/constants/prayers";

export default function PrayersLayout() {
  return (
    <section 
      id={'prayers'}
      className="w-full h-full font-sans"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <section 
          id="commom"
          className="flex flex-col gap-2"
        >
          <h1 className="font-bold text-secondary text-2xl md:text-3xl">
            Principais
          </h1>
          <div className="flex flex-col">
            {commonPrayers.map((prayer, index) => (
              <Link
                key={index}
                aria-label={prayer.title}
                title={prayer.title}
                href={`/ajuda/oracoes${prayer.href}`}
              >
                <span className="font-medium hover:underline ml-2">
                  • {prayer.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section 
          id="specific-prayers"
          className="flex flex-col gap-2"
        >
          <h1 className="font-bold text-secondary text-2xl md:text-3xl">
            Específicas
          </h1>
          <div className="flex flex-col">
            {specificPrayers.map((prayer, index) => (
              <Link
                key={index}
                aria-label={prayer.title}
                title={prayer.title}
                href={`/ajuda/oracoes${prayer.href}`}
              >
                <span className="font-medium hover:underline ml-2">
                  • {prayer.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section 
          id="rosary"
          className="flex flex-col gap-2"
        >
          <h1 className="font-bold text-secondary text-2xl md:text-3xl">
            Diversas
          </h1>
          <div className="flex flex-col">
            {rosary.map((prayer, index) => (
              <Link
                key={index}
                aria-label={prayer.title}
                title={prayer.title}
                href={`/ajuda/oracoes${prayer.href}`}
              >
                <span className="font-medium hover:underline ml-2">
                  • {prayer.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};