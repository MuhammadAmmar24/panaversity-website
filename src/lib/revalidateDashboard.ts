"use server";

import { revalidatePath } from "next/cache";

async function revalidateTag(name: string) {
    revalidatePath(name);
}

export default revalidateTag;