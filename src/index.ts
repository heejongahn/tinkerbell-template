import { format } from "date-fns";

import { fetchHouses } from "./remotes";
import { formatKRW } from "./utils";
import createIssue from "./github";
import candidates from "./data/candidates";

async function main() {
  const sections: string[] = [];

  await Promise.all(
    candidates.map(async candidate => {
      const houses = await fetchHouses(candidate);
      const section = [
        `# ${candidate.id}근처 ${houses.length}개`,
        "",
        ...houses.map(house =>
          [
            "",
            `## ${house.info.title}`,
            `<img src=${house.info.thumbnail} >`,
            `${house.displayLocation} | ${formatKRW(
              house.price.deposit,
            )} / ${formatKRW(house.price.rent)}(+ ${formatKRW(
              house.price.maintenance,
            )})\n`,
            `${house.roomCount} ${house.contractType} | ${house.floor.target}/${house.floor.total} 층`,
            `[링크](https://www.peterpanz.com/house/${house.id})`,
            "",
          ].join("\n"),
        ),
      ].join("\n");

      sections.push(section);
    }),
  );

  const body = sections.join("\n\n");
  createIssue(`${format(Date.now(), "yyyy-MM-dd")}일 새로 올라온 방`, body);
}

main();
