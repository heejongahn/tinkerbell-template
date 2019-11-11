import { Filter, RoomFloor, RoomType, ContractType } from "../filter";

/**
 * 월세 한도 (단위 만원)
 */
const rentBudget = 100;

/**
 * 보증금 한도 (단위 만원)
 */
const depositBudget = 100;

const candidates: Filter[] = [
  {
    priceRange: {
      rent: { max: rentBudget * 10000 },
      deposit: { max: depositBudget * 10000 },
    },
    roomFloors: [RoomFloor.lower, RoomFloor.higher],
    roomTypes: [RoomType.twoRooms, RoomType.threeAndMoreRooms],
    contractTypes: [ContractType.rent],
    shouldIncludeHalfUndergrounds: false,
    shouldIncludeLofts: true,
    shouldIncludeRooftops: true,
    bounds: {
      upperLeft: { lat: 37.5558485, lng: 127.060802 },
      lowerRight: { lat: 37.5317832, lng: 127.0328288 },
    },
  },
];

export default candidates;
