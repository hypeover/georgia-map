import Dexie, { Table } from "dexie";

interface Place {
  id: string;
  lat: number;
  lon: number;
  thumbnail: string;
  url: string;
  types: string[];
  title: string;
  fav: boolean;
}

class AppDB extends Dexie {
  places!: Table<Place>;
  deletedPlaces!: Table<Place>;

  constructor() {
    super("PlacesDB");

    this.version(2).stores({
      places: "id, lat, lon, thumbnail, url, types, title, fav",
      deletedPlaces: "id, fav",
    });
  }
  
  async  hasUserData() {
  const count = await db.places.count();
  return count > 0;
}

  async getAllPlaces() {
    return await this.places.toArray();
  }

  async getDeletedPlaces() {
    return await this.deletedPlaces.toArray();
  }

  async getFavorites() {
    return await this.places.filter(place => place.fav).toArray();
  }

  async toggleFavorite(id: string) {
    const place = await this.places.where("id").equals(id).first();
    if (!place) return;

    return await this.places.update(id, {
      fav: !place.fav,
    });
  }

  async restorePlace(id: string) {
    const place = await this.deletedPlaces.where("id").equals(id).first();
    if (!place) return;

    await this.places.put(place);
    await this.deletedPlaces.delete(id);
  }

  async deletePlace(id: string) {
    const place = await this.places.where("id").equals(id).first();
    if (!place) return;

    await this.deletedPlaces.put(place);
    await this.places.delete(id);
  }
  async importPlaces(data: Place[]) {
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    const placesWithIds = data.map(place => ({
      ...place,
      id: place.id || crypto.randomUUID(),
    }));

    await this.places.clear();
    return await this.places.bulkPut(placesWithIds);
  }
}

export const db = new AppDB();
