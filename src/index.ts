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
        `# ${candidate.id}: ${houses.length}개`,
        "",
        ...houses.map(
          ({
            displayLocation,
            info,
            price,
            roomType,
            roomCount,
            contractType,
            floor,
            id,
          }) => {
            const title = `## [${displayLocation}] ${info.title}`;
            const thumbnail = `<img src=${info.thumbnail} >`;
            const deposit = formatKRW(price.deposit);
            const monthly = ` ${formatKRW(price.rent)}<br>(+ ${formatKRW(
              price.maintenance,
            )})`;

            const floorInfo = `총 ${floor.total}층 중 ${floor.target}층`;

            return [
              title,
              thumbnail,
              "",
              `| 종류 | 보증금 | 월세<br>(+ 관리비) | 방 타입 | 층수 |`,
              `| - | - | - | - | - |`,
              `| ${roomCount} ${contractType} | ${deposit} | ${monthly} | ${roomType} | ${floorInfo} |`,
              "",
              `[바로가기](https://www.peterpanz.com/house/${id})`,
              "<hr>",
            ].join("\n");
          },
        ),
      ].join("\n");

      sections.push(section);
    }),
  );

  const body = sections.join("\n\n");
  createIssue(`${format(Date.now(), "yyyy-MM-dd")}일 새로 올라온 방`, body);
}

main();
