export const routes = [
    {
        path:'/discover',
        name:'Discover',
        component: () => import('../views/discover.vue'),
        children:[
            {
                path:'ranking',
                name:'Ranking',
                component: r => require(['../views/discover/Ranking.vue'], r)
            },
            {
                path:'songSheet',
                name:'SongSheet',
                component: r => require(['../views/discover/songSheet.vue'], r)
            },
            {
                path:'ggg',
                name:'Ggg',
                component: r => require(['../views/discover/ggg.vue'], r)
            },
            {
                path:'tuijian',
                name:'Tuijian',
                component: r => require(['../views/discover/tuijian.vue'], r)
            },
            {
                path:'songdetail',
                name:'SongDetail',
                component: r => require(['../views/discover/songdetail.vue'], r)
            },
            {
                path:'single',
                name:'Single',
                component: r => require(['../views/discover/single.vue'],r)
            },
        ]
    },
    {
        path:'*',
        redirect: {
            name:'Tuijian'
        }
    }
]