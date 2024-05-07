import { atom, onMount, task } from "nanostores";

import { Product } from "../types/products";
import { getMenu } from "../services/apiRestaurant";

export const menu = atom<Array<Product>>([])

onMount(menu, () => {
    task(async () => menu.set(await getMenu()));
})