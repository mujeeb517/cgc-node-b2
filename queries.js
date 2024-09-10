const { db } = require("./models/productModel")

// give me total population for IL state, unoptimized query
db.cities.aggregate(
    [
        { $group: { _id: '$state', total: { $sum: '$pop' } } },
        {
            $match: { _id: 'IL' }
        }
    ]
)

// give me total population for IL state, optimized query
db.cities.aggregate(
    [
        { $match: { state: 'IL' } },
        { $group: { _id: '$state', total: { $sum: '$pop' } } }
    ]
)

// give me all the states by populationd ascending
db.cities.aggregate(
    [
        { $group: { _id: '$state', totalPop: { $sum: '$pop' } } },
        { $sort: { totalPop: 1 } }
    ]
)

// give me all the states by populationd descending
db.cities.aggregate(
    [
        { $group: { _id: '$state', totalPop: { $sum: '$pop' } } },
        { $sort: { totalPop: -1 } }
    ]
)

// give me top 3 states by population
db.cities.aggregate(
    [
        { $group: { _id: '$state', totalPop: { $sum: '$pop' } } },
        { $sort: { totalPop: -1 } },
        { $limit: 3 }
    ]
)

// give me top 3 states with lowest population
db.cities.aggregate(
    [
        { $group: { _id: '$state', totalPop: { $sum: '$pop' } } },
        { $sort: { totalPop: 1 } },
        { $limit: 3 }
    ]
)

// $project 
db.cities.aggregate(
    [
        { $group: { _id: '$state', total: { $sum: '$pop' } } },
        { $project: { 'State': '$_id', population: '$total', _id: 0, } }
    ]
)


// give me all the states which has more than 1million population
db.cities.aggregate(
    [
        { $group: { _id: '$state', totalPop: { $sum: '$pop' } } },
        { $match: { totalPop: { $gte: 10000000 } } }
    ]
)


// get me avg rating for the reviews
db.reviews.aggregate([
    { $match: { productId: '66d90dc3c5bc1ce8cf7309da' } },
    { $group: { _id: '$productId', average: { $avg: '$rating' } } }
]);