import { normalize } from "@brz/shared";
import type { TutoAttributes } from "~/types/tuto";

export function normalizeTuto(tuto: TutoAttributes): string {
    const elements = []

    if (tuto.icon) elements.push(tuto.icon)
    if (tuto.text) elements.push(tuto.text)

    return normalize(elements.join('-'))
}

