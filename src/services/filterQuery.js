exports.getFilterQuery = async (query) => {
    let newQuery = [];
    if (query.search && query.search !== '') {
        const searchQuery = query.searchColumns.map((column) => {
            return {
                [column]: {
                    $regex: `${query.search.replace(
                        /[-[\]{}()*+?.,\\/^$|#\s]/g,
                        '\\$&',
                    )}`,
                    $options: 'i',
                },
            };
        });
        if (query['$or'] !== undefined) {
            query['$and'] = [{ $or: query['$or'] }, { $or: searchQuery }];
            delete query['$or'];
        } else {
            query['$or'] = searchQuery;
        }
        delete query.search;
        delete query.searchColumns;
    }

    if (query.relationFilter) {
        await Promise.all(
            _.map(query.relationFilter, async (filter) => {
                const model = require(`../model/${filter.model}`);
                const filterResponse = await model.find({
                    $or: filter.searchColumns.map((column) => {
                        return {
                            [column]: {
                                $regex: `${filter.search}`,
                                $options: 'i',
                            },
                        };
                    }),
                });
                if (filterResponse && filterResponse.length) {
                    newQuery.push({
                        [filter.filterColumn]: {
                            $in: filterResponse.map((response) => response._id),
                        },
                    });
                } else {
                    newQuery.push({
                        [filter.filterColumn]: {
                            $in: [],
                        },
                    });
                }
            }),
        );
        delete query['relationFilter'];
        return { $or: newQuery, ...query };
    }

    return query;
};

