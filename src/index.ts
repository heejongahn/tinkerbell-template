import axios from "axios";
import { stringify } from "query-string";

import { constructFilterQueryParam } from "./filter";
import candidates from "./data/candidates";

const apiEndpoint = "https://api.peterpanz.com/houses/area";

async function main() {
  candidates.map(async candidate => {
    const query: { [key: string]: any } = {
      filter: constructFilterQueryParam(candidate),
      pageSize: 100,
      pageIndex: 1,
    };

    const url = `${apiEndpoint}?${stringify(query)}`;

    console.log(url);

    try {
      const { data } = await axios.get(url, {
        headers: { "content-type": "application/json" },
      });

      console.log(data);
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  });
}

main();
