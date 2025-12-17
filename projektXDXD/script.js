const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
    let habits=[];
    function renderHabit(){
        habitList.innerHTML ="";
        habits.forEach((habit,index)=>{
            const li = document.createElement("li");

            li.innerHTML = 
            <span>${habit.name}(🔥${habit.streak})</span>;   
            <button>${habit.completedToday ? "✔" : "❌"}</button>;
            
            li.querySelector("button").addEventListener("click",()=>{
                ToggleHabbit(index);
            });
            habitlist.appendChild(li)   
        })

    }


    addHabitBtn.addEventListener("click",()=>{
        const habitName = habitInput.value;
        if(habitName === "")return;

        habits.push({
            name: habitName,
            completedToday :false,
            streak: 0
        });
        habitInput.value="";
        renderHabit();
    })
    function ToggleHabbit(){
        const habit = habits[index];

        habit.completedToday = habit.completedToday;

        if(habit.completedToday){
            habit.streak++
        }else{
            habit.streak = 0
        }
        renderHabit;
    }
    function saveHabits(){
        localStorage.setItem("habits",JSON.stringify(habits));
    }
    function loadHabits(){
        const data = localStorage.getItem("Habits");
        if(data){
            habits = JSON.parse(data)
            renderHabit();
        }

    }
function getToday() {
        return new Date().toISOString().split("T")[0];
      }
      habits.push({
        name: habitName,
        history: {}
      });
      function getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          days.push(date.toISOString().split("T")[0]);
        }
        return days;
      }
      function renderHabits() {
        habitList.innerHTML = "";
      
        const days = getLast7Days();
      
        habits.forEach((habit, habitIndex) => {
          const li = document.createElement("li");
      
          let calendarHTML = `<div class="calendar">`;
      
          days.forEach(day => {
            const done = habit.history[day];
            calendarHTML += `
              <div 
                class="day ${done ? "done" : ""}" 
                data-day="${day}"
              ></div>
            `;
          });
      
          calendarHTML += `</div>`;
      
          li.innerHTML = `
            <strong>${habit.name}</strong>
            ${calendarHTML}
          `;
      
          const dayElements = li.querySelectorAll(".day");
      
          dayElements.forEach((dayEl, dayIndex) => {
            dayEl.addEventListener("click", () => {
              toggleDay(habitIndex, days[dayIndex]);
            });
          });
      
          habitList.appendChild(li);
        });
      }
      function toggleDay(habitIndex, day) {
        const habit = habits[habitIndex];
      
        if (habit.history[day]) {
          delete habit.history[day];
        } else {
          habit.history[day] = true;
        }
      
        saveHabits();
        renderHabits();
      }
        function calculateStreak(habit) {
        let streak = 0;
        let date = new Date();

        while (true) {
            const day = date.toISOString().split("T")[0];
            if (habit.history[day]) {
            streak++;
            date.setDate(date.getDate() - 1);
            } else {
            break;
            }
        }

        return streak;
        }
        function calculateStreak(habit) {
            let streak = 0;
            let date = new Date();
        
            while (true) {
            const day = date.toISOString().split("T")[0];
            if (habit.history[day]) {
                streak++;
                date.setDate(date.getDate() - 1);
            } else {
                break;
            }
            }
        
            return streak;
        }
        const streak = calculateStreak(habit);
        <strong>${habit.name} 🔥 ${streak}</strong>

    loadHabits();
