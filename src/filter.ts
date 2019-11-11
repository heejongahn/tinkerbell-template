interface PriceRange {
  min?: number;
  max: number;
}

export enum RoomFloor {
  lower = "1층 ~ 5층",
  higher = "6층 이상",
}

export enum RoomType {
  oneRoom = "원룸",
  twoRooms = "투룸",
  threeAndMoreRooms = "쓰리룸 이상",
}

export enum ContractType {
  rent = "월세",
  jeonse = "전세",
  sale = "매매",
  shortTerm = "단기임대",
}

interface Point {
  lat: number;
  lng: number;
}

export interface Filter {
  priceRange: {
    rent?: PriceRange;
    deposit?: PriceRange;
  };
  bounds: {
    upperLeft: Point;
    lowerRight: Point;
  };
  roomFloors: RoomFloor[];
  roomTypes: RoomType[];
  contractTypes: ContractType[];
  shouldIncludeHalfUndergrounds: boolean;
  shouldIncludeLofts: boolean;
  shouldIncludeRooftops: boolean;
}

export function constructFilterQueryParam(filter: Filter) {
  const { priceRange, bounds, roomFloors, roomTypes, contractTypes } = filter;

  const tokens: string[] = [
    `latitude:${bounds.lowerRight.lat}~${bounds.upperLeft.lat}`,
    `longitude:${bounds.lowerRight.lng}~${bounds.upperLeft.lng}`,
  ];

  if (priceRange.rent) {
    tokens.push(
      `checkMonth:${priceRange.rent.min || 999}~${priceRange.rent.max}`,
    );
  }

  if (priceRange.deposit) {
    tokens.push(
      `checkDeposit:${priceRange.deposit.min || 999}~${priceRange.deposit.max}`,
    );
  }

  if (roomFloors.length > 0) {
    const totalRoomFloors = roomFloors.map(f => `"${f}"`);

    tokens.push(`roomCount_etc;[${totalRoomFloors.join(",")}]`);
  }

  if (roomTypes.length > 0) {
    tokens.push(`roomType;[${roomTypes.map(t => `"${t}"`).join(",")}]`);
  }

  if (contractTypes.length > 0) {
    tokens.push(`contractType;[${contractTypes.map(t => `"${t}"`).join(",")}]`);
  }

  return tokens.join("||");
}
