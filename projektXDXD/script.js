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
    loadHabits();