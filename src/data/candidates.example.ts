import { Filter, RoomFloor, RoomCount, ContractType } from "../filter";

/**
 * 월세 한도 (단위 만원)
 */
const rentBudget = 100;

/**
 * 보증금 한도 (단위 만원)
 */
const depositBudget = 100;

const commonFilter = {
  priceRange: {
    rent: { max: rentBudget * 10000 },
    deposit: { max: depositBudget * 10000 },
  },
  roomFloors: [RoomFloor.lower, RoomFloor.higher],
  roomCounts: [RoomCount.twoRooms, RoomCount.threeAndMoreRooms],
  contractTypes: [ContractType.rent],
  shouldIncludeHalfUndergrounds: false,
  shouldIncludeLofts: true,
  shouldIncludeRooftops: true,
};

const candidates: Filter[] = [
  {
    ...commonFilter,
    bounds: {
      upperLeft: { lat: 37.5558485, lng: 127.060802 },
      lowerRight: { lat: 37.5317832, lng: 127.0328288 },
    },
  },
  {
    ...commonFilter,
    bounds: {
      upperLeft: { lat: 37.4854867, lng: 127.0506948 },
      lowerRight: { lat: 37.4667919, lng: 127.0319895 },
    },
  },
  {
    ...commonFilter,
    bounds: {
      upperLeft: { lat: 37.508058, lng: 127.0463052 },
      lowerRight: { lat: 37.4893626, lng: 127.0275955 },
    },
  },
];

export default candidates;
