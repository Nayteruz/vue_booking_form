<template>
  <div class="bk-calendar" >
    <div class="bk-calendar--header">
      <span class="bk-calendar--month-prev" @click="month_prev"></span>
      <span class="bk-calendar--month-name" :class="{'fadeLeft':animateLeft, 'fadeRight': animateRight}">{{ today_month_name }} {{ today_year }}</span>
      <span class="bk-calendar--month-next" @click="month_next"></span>
    </div>
    <div class="bk-calendar--week" :class="{'fadeLeft':animateLeft, 'fadeRight': animateRight}">
      <div class="day" v-for="d in week" :key="d.id"><span>{{d.ws}}</span></div>
    </div>
    <div class="bk-calendar--dates" :class="{'fadeLeft':animateLeft, 'fadeRight': animateRight}">
      <div class="empty" v-for="empty in empty_days" :key="empty.id"></div>
      <div
        class="day"
        :class="{'current' : day?.current, 'selected' : day?.selected}"
        v-for="day in month_days_by_week"
        @click="select_day(day)"
        :key="day"
      >
        <span>{{ day.day }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import '@/assets/css/bk-calendar.css';
  import {computed, onMounted, ref} from "vue";

  const week = ref([
    {id:1, ws:'П', w2:'Пн', wf:'Понедельник'},
    {id:2, ws:'В', w2:'Вт', wf:'Вторник'},
    {id:3, ws:'С', w2:'Ср', wf:'Среда'},
    {id:4, ws:'Ч', w2:'Чт', wf:'Четверг'},
    {id:5, ws:'П', w2:'Пт', wf:'Пятница'},
    {id:6, ws:'С', w2:'Сб', wf:'Суббота'},
    {id:7, ws:'В', w2:'Вс', wf:'Воскресенье'},
  ]);
  const month = ref(['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']);

  const getWeekDay = (year, month, day) => {
    let gDate = new Date(year, month, day);
    return gDate.getDay() === 0 ? 7 : gDate.getDay();
  }
  const month_data = () => {
    month_days_by_week.value = [];
    empty_days.value = [];
    let first_week_day = getWeekDay(today_year.value, today_month.value, 1);
    for(let i = 1; i< first_week_day; i++){
      empty_days.value.push({name:'empty', id:i});
    }

    for (let i = 1; i<=last_day_month.value; i++){
      let day_data = {
        fullDate: pad(today_year.value) + '/' + pad(today_month.value) + '/' + pad(i),
        month_num: today_month.value,
        month_name: today_month_name.value,
        day: pad(i),
        day_num: i,
        selected: false,
        disabled: false,
        current: current.value.getDate() === i && current.value.getMonth() === today_month.value && current.value.getFullYear() === today_year.value,
      }
      month_days_by_week.value.push(day_data);
    }

  }
  const pad = (n) => n < 10 ? '0'+n:n;

  const animateLeft = ref(false);
  const animateRight = ref(false);


  const current = ref(new Date());

  const today = ref(new Date());

  const today_month = computed(()=>{
    return today.value.getMonth();
  })
  const today_month_name = computed(()=>{
    return month.value[today_month.value];
  })
  const today_year = computed(()=>{
    return today.value.getFullYear();
  })
  const last_day_month = computed(()=>{
    return new Date(today_year.value, today_month.value+1, 0).getDate()
  })

  const month_days_by_week = ref([]);
  const empty_days = ref([]);

  const selected_day = ref(null);

  const select_day = (day) => {
    selected_day.value = day;
    for(let d of month_days_by_week.value){
      d.selected = d === day;
    }
  }

  const month_prev = () => {
    let current = new Date(today.value);
    current.setMonth(today_month.value-1);
    animateLeft.value = true;
    setTimeout(()=>{
      today.value = new Date(current);
      month_data();
      animateLeft.value = false;
    },300)
  }
  const month_next = () => {
    let current = new Date(today.value);
    current.setMonth(today_month.value+1);
    animateRight.value = true;
    setTimeout(()=>{
      today.value = new Date(current);
      month_data();
      animateRight.value = false;
    },300)
  }

  onMounted(() =>{
    month_data()
  })







</script>
