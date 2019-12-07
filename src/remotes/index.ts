import axios from 'axios';
import { stringify } from 'query-string';

import { Filter, constructFilterQueryParam } from '../filter';
import { HousePayload, House } from '../models/House';

interface FetchHousesResponse {
    houses: {
        direct?: {
            image?: HousePayload[];
        };
        withoutFee?: {
            image?: HousePayload[];
        };
        agency?: {
            image?: HousePayload[];
        };
    };
}

const apiEndpoint = 'https://api.peterpanz.com/houses/area';

export async function fetchHouses(candidate: Filter): Promise<House[]> {
    const query: { [key: string]: any } = {
        filter: constructFilterQueryParam(candidate),
        pageSize: 100,
        pageIndex: 1,
    };

    const url = `${apiEndpoint}?${stringify(query)}`;

    const { data } = await axios.get<FetchHousesResponse>(url, {
        headers: { 'content-type': 'application/json' },
    });

    if (Array.isArray(data)) {
        return [];
    }

    const { direct, withoutFee, agency } = data.houses;

    const candidates = [direct, withoutFee, agency]
        .map(category => (category ? category.image || [] : []))
        .reduce((accm, curr) => accm.concat(curr), []);

    const houses = candidates.filter(h => {
        return (
            (candidate.shouldIncludeHalfUndergrounds || !h.info.is_half_underground) &&
            (candidate.shouldIncludeLofts || !h.info.is_multilayer) &&
            (candidate.shouldIncludeRooftops || !h.info.is_octop)
        );
    });

    return houses.map(payload => new House(payload)).filter(h => h.isNew);
}
