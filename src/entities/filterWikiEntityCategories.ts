import { uniq } from "@textactor/domain";

export function filterEntityCategories(categories: string[], limit?: number): string[] {
    if (!categories) {
        return categories;
    }

    limit = limit || 5;

    categories = uniq(categories.map(c => c.indexOf(':') > 0 ? c.split(/:/)[1] : c)).slice(0, limit);

    return categories;
}
