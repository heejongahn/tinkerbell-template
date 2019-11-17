import { Filter, RoomFloor, RoomCount, ContractType } from '../filter';

/**
 * 월세 한도 (단위 만원)
 */
const rentBudget = 100;

/**
 * 보증금 한도 (단위 만원)
 */
const depositBudget = 100;

const commonFilter: Omit<Filter, 'bounds' | 'id'> = {
    priceRange: {
        rent: { max: rentBudget * 10000 },
        deposit: { max: depositBudget * 10000 },
        shouldIncludeMaintenance: true,
    },
    buildingTypes: [],
    roomFloors: [RoomFloor.lower, RoomFloor.higher],
    roomCounts: [RoomCount.twoRooms, RoomCount.threeAndMoreRooms],
    contractTypes: [ContractType.rent],
    shouldIncludeHalfUndergrounds: false,
    shouldIncludeLofts: true,
    shouldIncludeRooftops: true,
};

const candidates: Filter[] = [
    {
        id: '뚝섬 서울숲',
        ...commonFilter,
        bounds: {
            max: { lat: 37.5558485, lng: 127.060802 },
            min: { lat: 37.5317832, lng: 127.0328288 },
        },
    },
    {
        id: '양재',
        ...commonFilter,
        bounds: {
            max: { lat: 37.4854867, lng: 127.0506948 },
            min: { lat: 37.4667919, lng: 127.0319895 },
        },
    },
    {
        id: '회사 근처',
        ...commonFilter,
        bounds: {
            max: { lat: 37.508058, lng: 127.0463052 },
            min: { lat: 37.4893626, lng: 127.0275955 },
        },
    },
];

export default candidates;
