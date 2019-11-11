import candidates from "./data/candidates";
import { fetchHouses } from "./remotes";

async function main() {
  candidates.map(async candidate => {
    const houses = await fetchHouses(candidate);
    console.log(houses);
  });
}

main();
