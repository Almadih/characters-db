
import data from './data.json'

class API {
    CACHE_TIME = 12;
    categories = [
        {
            "id": 0,
            "name": "All Category"
        },
        {
            "id": 14,
            "name": "Music"
        },
        {
            "id": 29,
            "name": "Kpop"
        },
        {
            "id": 21,
            "name": "Science"
        },
        {
            "id": 28,
            "name": "Philosophy"
        },
        {
            "id": 27,
            "name": "Superheroes"
        },
        {
            "id": 3,
            "name": "Movies"
        },
        {
            "id": 7,
            "name": "Cartoons"
        },
        {
            "id": 8,
            "name": "Anime & Manga"
        }
    ];

    types = [
        {
            "id": 0,
            "name": "Select Type"
        },
        {
        "id": "1",
        "name": "ISTJ",
        },
        {
        "id": "2",
        "name": "ESTJ",
        },
        {
        "id": "3",
        "name": "ISFJ",
        },
        {
        "id": "4",
        "name": "ESFJ",
        },
        {
        "id": "5",
        "name": "ESFP",
        },
        {
        "id": "6",
        "name": "ISFP",
        },
        {
        "id": "7",
        "name": "ESTP",
        },
        {
        "id": "8",
        "name": "ISTP",
        },
        {
        "id": "9",
        "name": "INFJ",
        },
        {
        "id": "10",
        "name": "ENFJ",
        },
        {
        "id": "11",
        "name": "INFP",
        },
        {
        "id": "12",
        "name": "ENFP",
        },
        {
        "id": "13",
        "name": "INTP",
        },
        {
        "id": "14",
        "name": "ENTP",
        },
        {
        "id": "15",
        "name": "INTJ",
        },
        {
        "id": "16",
        "name": "ENTJ",
        }
        ]
    async fetchData(typeId, categoryId) {
        const cache = this.fetchCache(typeId, categoryId);

        if (cache && cache.timestamp > new Date().getTime()) {
            console.log('Using Cached Data')
            return this.filterData(cache.data);
        }



        const data = this.getData(typeId, categoryId)

        this.storeCache(typeId, categoryId, data);
        return this.filterData(data);
    }

    storeCache(typeId, categoryId, data) {
        console.log('Storing Data in Cache')
        localStorage.setItem(`${typeId} - ${categoryId}`, JSON.stringify({
            timestamp: new Date().getTime() + this.CACHE_TIME * 60 * 60 * 1000,
            data
        }));

    }

    getData(typeId, categoryId) {
        const res = data.filter(item => {
            return item.type.id == typeId && item.category.id == categoryId
        });

        return res[0];

    }

    fetchCache(typeId, categoryId) {
        const cache = localStorage.getItem(`${typeId} - ${categoryId}`);
        if (cache) {
            return JSON.parse(cache);
        }

        return null;
    }

    filterData(data) {
        const categoriesIdsList = this.categories.map(cat=>cat.id)
        const profiles = data.profiles.filter(profile=>{
            return categoriesIdsList.includes(profile.cat_id) 
        })

        return {...data,profiles:profiles}
    }
}

export default new API();