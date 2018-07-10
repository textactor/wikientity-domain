import { uniq } from "@textactor/domain";

export function filterEntityCategories(categories: string[] | undefined, limit?: number): string[] {
    if (!categories) {
        return [];
    }

    limit = limit || 5;

    categories = uniq(categories.map(c => c.indexOf(':') > 0 ? c.split(/:/)[1] : c)).slice(0, limit);

    return categories;
}
