"use server";

import { revalidateTag } from "next/cache";

async function revalidateDashboard(name: string) {
    revalidateTag(name)
}

export default revalidateDashboard;