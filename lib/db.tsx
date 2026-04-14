import Dexie, { Table } from "dexie";

interface Place {
  _id?: number;
  id: string;
  lat: number;
  lon: number;
  thumbnail: string;
  url: string;
  types: string[];
  title: string;
  fav?: boolean;
}

class AppDB extends Dexie {
  places!: Table<Place>;

  constructor() {
    super("PlacesDB");

    this.version(1).stores({
      places: "++_id, id, lat, lon, thumbnail, url, types, title, fav"
    });
  }

  async getAllPlaces() {
    return await this.places.toArray();
  }

  async getFavorites() {
    return await this.places.where("fav").equals(1).toArray();
  }

  async toggleFavorite(id: string) {
    const place = await this.places.where("id").equals(id).first();
    if (!place) return;

    return await this.places.update(place._id, {
      fav: !place.fav
    });
  }

  async deletePlace(id: string) {
    return await this.places.delete(id);
  }
  async importPlaces(data: Place[]) {
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    await this.places.clear();
    return await this.places.bulkPut(data);
  }
}

export const db = new AppDB();