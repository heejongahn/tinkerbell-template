interface PriceRange {
    min?: number;
    max: number;
}

export enum BuildingType {
    villa = '빌라/주택',
    officetel = '오피스텔',
    apt = '아파트',
    office = '상가/사무실',
}

export enum RoomFloor {
    lower = '1층 ~ 5층',
    higher = '6층 이상',
}

export enum RoomCount {
    oneRoom = '원룸',
    twoRooms = '투룸',
    threeAndMoreRooms = '쓰리룸 이상',
}

export enum ContractType {
    rent = '월세',
    jeonse = '전세',
    sale = '매매',
    shortTerm = '단기임대',
}

interface Point {
    lat: number;
    lng: number;
}

export interface Filter {
    id: string;
    priceRange: {
        deposit?: PriceRange;
        rent?: PriceRange;
        /**
         * 월세 한도 판단에 관리비를 포함할지 여부
         */
        shouldIncludeMaintenance: boolean;
    };
    bounds: {
        max: Point;
        min: Point;
    };
    buildingTypes: BuildingType[];
    roomFloors: RoomFloor[];
    roomCounts: RoomCount[];
    contractTypes: ContractType[];
    shouldIncludeHalfUndergrounds: boolean;
    shouldIncludeLofts: boolean;
    shouldIncludeRooftops: boolean;
}

export function constructFilterQueryParam(filter: Filter) {
    const { priceRange, bounds, buildingTypes, roomFloors, roomCounts, contractTypes } = filter;

    const tokens: string[] = [
        `latitude:${bounds.min.lat}~${bounds.max.lat}`,
        `longitude:${bounds.min.lng}~${bounds.max.lng}`,
    ];

    if (priceRange.rent) {
        tokens.push(`checkMonth:${priceRange.rent.min || 999}~${priceRange.rent.max}`);
    }

    if (priceRange.deposit) {
        tokens.push(`checkDeposit:${priceRange.deposit.min || 999}~${priceRange.deposit.max}`);
    }

    if (priceRange.shouldIncludeMaintenance) {
        tokens.push('isManagerFee;["add"]');
    }

    const multipleQueryList: [string, string[]][] = [
        ['roomCount_etc', roomFloors],
        ['roomType', roomCounts],
        ['contractType', contractTypes],
        ['buildingType', buildingTypes],
    ];

    multipleQueryList.forEach(([label, values]) => {
        if (values.length > 0) {
            tokens.push(`${label};[${values.map(t => `"${t}"`).join(',')}]`);
        }
    });

    return tokens.join('||');
}
