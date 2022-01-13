/*
export const getCategories = async () => {
    const response = await fetch("http://localhost:4000/api/categories")
    const categories = await response.json()
    return categories
}
*/

export const getCategories = () => {
    return categories
}

const categories = [
    {
        "name": "category 1",
        "category_id": "1",
        "level": 1,
        "parent": {
            "parentID": null,
            "level": 0
        }
    },
    {
        "name": "category 1.1",
        "category_id": "1.1",
        "level": 2,
        "parent": {
            "parentId": "1",
            "level": 1
        }
    },
    {
        "name": "category 1.1.1",
        "category_id": "1.1.1",
        "level": 3,
        "parent": {
            "parentId": "1.1",
            "level": 2
        }
    },
    {
        "name": "category 1.2",
        "category_id": "1.2",
        "level": 2,
        "parent": {
            "parentId": "1",
            "level": 1
        }
    },
    {
        "name": "category 1.2.1",
        "category_id": "1.2.1",
        "level": 3,
        "parent": {
            "parentId": "1.2",
            "level": 2
        }
    },
    {
        "name": "category 1.2.2",
        "category_id": "1.2.2",
        "level": 3,
        "parent": {
            "parentId": "1.2",
            "level": 2
        }
    },
    {
        "name": "category 1.3",
        "category_id": "1.3",
        "level": 2,
        "parent": {
            "parentId": "1",
            "level": 1
        }
    }
]