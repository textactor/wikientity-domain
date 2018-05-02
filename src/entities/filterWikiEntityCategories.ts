import { uniq } from "@textactor/domain";

export function filterEntityCategories(categories: string[], limit?: number): string[] {
    if (!categories) {
        return categories;
    }

    limit = limit || 5;

    categories = uniq(categories).slice(0, limit);

    return categories;
}
