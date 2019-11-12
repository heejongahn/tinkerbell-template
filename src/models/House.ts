import { ContractType, RoomCount } from "../filter";
import { parse, differenceInCalendarDays, addHours } from "date-fns";

export type RoomType = "일반" | "옥탑" | "반지하" | "복층";

export interface HousePayload {
  hidx: number;
  info: {
    subject: string;
    room_count: number;
    bedroom_count: number;
    thumbnail: string;
    created_at: string;
    live_start_date: string;
    is_octop: boolean;
    is_half_underground: boolean;
    is_multilayer: boolean;
  };
  type: {
    contract_type: ContractType;
    trade_type: "direct" | "agency";
    building_form: string | null;
    building_type: string;
    building_code: string;
    isCafe: boolean;
    fa3Code: 0;
  };
  price: { monthly_fee: number; deposit: number; maintenance_cost: number };
  floor: { target: 2; total: 4; floor_type: 1 };
  location: {
    coordinate: {
      latitude: string;
      longitude: string;
    };
    address: {
      sido: string;
      sigungu: string;
      dong: string;
    };
  };
}

export class House {
  id: number;

  price: {
    deposit: number;
    rent: number;
    maintenance: number;
  };

  displayLocation: string;

  floor: {
    total: number;
    target: number;
  };

  info: {
    title: string;
    thumbnail: string;
    createdAt: string;
  };

  contractType: ContractType;
  roomType: RoomType;
  roomCount: RoomCount;

  get isNew() {
    // GitHub Action은 UTC 시간대에서 실행됨
    const now = addHours(Date.now(), 9);
    const createdAt = parse(
      this.info.createdAt.split(" ")[0],
      "yyyy-MM-dd",
      Date.now(),
    );

    const diff = differenceInCalendarDays(now, createdAt);
    return diff < 2;
  }

  constructor(payload: HousePayload) {
    const { hidx, info, price, type, floor, location } = payload;

    this.id = hidx;

    this.price = {
      deposit: price.deposit,
      rent: price.monthly_fee,
      maintenance: price.maintenance_cost,
    };

    this.displayLocation = [
      location.address.sigungu,
      location.address.dong,
    ].join(" ");

    this.floor = floor;

    this.info = {
      title: info.subject,
      thumbnail: info.thumbnail,
      createdAt: info.created_at,
    };

    this.contractType = type.contract_type;
    this.roomCount =
      info.room_count >= 3
        ? RoomCount.threeAndMoreRooms
        : info.room_count === 2
        ? RoomCount.twoRooms
        : RoomCount.oneRoom;
    this.roomType = info.is_half_underground
      ? "반지하"
      : info.is_multilayer
      ? "복층"
      : info.is_octop
      ? "옥탑"
      : "일반";
  }
}
