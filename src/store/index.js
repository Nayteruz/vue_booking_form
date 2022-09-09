import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
    state: () => ({
        services: [
            {id:1, name:'Услуга 1', masters: [1,2,3]},
            {id:2, name:'Услуга 2', masters: [3,4,5]},
            {id:3, name:'Услуга 3', masters: [2,4,6]},
            {id:4, name:'Услуга 4', masters: [5,2,1]},
            {id:5, name:'Услуга 5', masters: [6,1]},
        ],
        masters: [
            {id:1, name:'Специалист 1 Илья', services:[]},
            {id:2, name:'Специалист 2 Дмитрий', services:[]},
            {id:3, name:'Специалист 3 Василий', services:[]},
            {id:4, name:'Специалист 4 Ульяна', services:[]},
            {id:5, name:'Специалист 5 Инокентий', services:[]},
            {id:6, name:'Специалист 6 Владимир', services:[]},
        ],
        day_time: [
            {id:1, time:'08:00', has:false, disabled:false, selected:false},
            {id:2, time:'08:30', has:false, disabled:false, selected:false},
            {id:3, time:'09:00', has:false, disabled:false, selected:false},
            {id:4, time:'09:30', has:false, disabled:false, selected:false},
            {id:5, time:'10:00', has:false, disabled:false, selected:false},
            {id:6, time:'10:30', has:false, disabled:false, selected:false},
            {id:7, time:'11:00', has:false, disabled:false, selected:false},
            {id:8, time:'11:30', has:false, disabled:false, selected:false},
            {id:9, time:'12:00', has:false, disabled:false, selected:false},
            {id:10, time:'12:30', has:false, disabled:false, selected:false},
            {id:11, time:'13:00', has:false, disabled:false, selected:false},
            {id:12, time:'13:30', has:false, disabled:false, selected:false},
            {id:13, time:'14:00', has:false, disabled:false, selected:false},
            {id:14, time:'14:30', has:false, disabled:false, selected:false},
            {id:15, time:'15:00', has:false, disabled:false, selected:false},
            {id:16, time:'15:30', has:false, disabled:false, selected:false},
            {id:17, time:'16:00', has:false, disabled:false, selected:false},
            {id:18, time:'16:30', has:false, disabled:false, selected:false},
            {id:19, time:'17:00', has:false, disabled:false, selected:false},
            {id:20, time:'17:30', has:false, disabled:false, selected:false},
            {id:21, time:'18:00', has:false, disabled:false, selected:false},
            {id:22, time:'18:30', has:false, disabled:false, selected:false},
            {id:23, time:'19:00', has:false, disabled:false, selected:false},
            {id:24, time:'19:30', has:false, disabled:false, selected:false},
        ],
        order: [
            {master_id:1, date:'2022.09.11', service_id:1, time_id:8, selected:false}
        ]
    }),
    actions: {
        addService(service){
            let new_service = this.services.find(s=>s.id===service.id);
            if(!new_service){
                this.services.push(service)
            } else {
                new_service.name=service.name;
                new_service.masters=service.masters;
            }
            this.setToLocal();
        },
        addMaster(master){
            let new_master = this.masters.find(s=>s.id===master.id);
            if(!new_master){
                this.masters.push(master)
            } else {
                new_master.name=master.name;
                new_master.services=master.services;
            }
            this.setToLocal();
        },
        deleteService(service){
            this.services = this.services.filter(s=>s!==service);
            this.setToLocal();
        },
        deleteMaster(master){
            this.masters = this.masters.filter(s=>s!==master);
            this.setToLocal();
        },

        setToLocal(){
            let data = {};
            data.services = this.services;
            data.masters = this.masters;
            localStorage.setItem('booking_data', JSON.stringify(data))
        },
        getFromLocal(){
            let data = JSON.parse(localStorage.getItem('booking_data'));
            this.services = data?.services ?? this.services;
            this.masters = data?.masters ?? this.masters;
        }
    },
})