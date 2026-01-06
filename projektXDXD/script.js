const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");
const calendar = document.getElementById("calendar");
const statsText = document.getElementById("statsText");
const darkToggle = document.getElementById("darkModeToggle");

let habits = JSON.parse(localStorage.getItem("habits")) || [];
let editId = null;

const today = new Date().toLocaleDateString();

// ================= RESET DNIA =================
function resetDaily() {
  habits.forEach(h => {
    if (h.lastUpdated !== today) {
      h.completedToday = false;
      h.lastUpdated = today;
    }
  });
  save();
}

// ================= STORAGE =================
function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// ================= RENDER =================
function renderHabits() {
  habitList.innerHTML = "";

  habits.forEach(h => {
    const streak = calculateStreak(h);

    const li = document.createElement("li");
    li.className = "habit-card";
    if (h.completedToday) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <strong>${h.name}</strong>
        <div class="streak">🔥 Streak: ${streak} dni</div>
      </div>
      <div class="habit-actions">
        <button onclick="toggleHabit('${h.id}')">✔</button>
        <button onclick="editHabit('${h.id}')">✏</button>
        <button onclick="deleteHabit('${h.id}')">🗑</button>
      </div>
    `;
    habitList.appendChild(li);
  });

  renderStats();
  renderProgress();
}


// ================= DODAWANIE =================
habitForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = habitInput.value.trim();
  if (!name) return;

  if (editId) {
    habits.find(h => h.id === editId).name = name;
    editId = null;
  } else {
    habits.push({
      id: crypto.randomUUID(),
      name,
      completedToday: false,
      history: {},
      lastUpdated: today
    });
  }

  habitInput.value = "";
  save();
  renderHabits();
});

// ================= AKCJE =================
function toggleHabit(id) {
  const habit = habits.find(h => h.id === id);
  habit.completedToday = !habit.completedToday;
  habit.history[today] = habit.completedToday;
  save();
  renderHabits();
}

function deleteHabit(id) {
  habits = habits.filter(h => h.id !== id);
  save();
  renderHabits();
}

function editHabit(id) {
  const habit = habits.find(h => h.id === id);
  habitInput.value = habit.name;
  editId = id;
}

// ================= STATYSTYKI =================
function renderStats() {
  const done = habits.filter(h => h.completedToday).length;
  statsText.textContent = `Dzisiaj wykonane: ${done}/${habits.length}`;
}

// ================= KALENDARZ =================
function renderCalendar() {
  calendar.innerHTML = "";
  const now = new Date();
  const days = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();

  for (let d = 1; d <= days; d++) {
    const date = new Date(now.getFullYear(), now.getMonth(), d)
      .toLocaleDateString();

    const div = document.createElement("div");
    div.className = "day";
    div.textContent = d;

    if (habits.some(h => h.history[date])) {
      div.classList.add("done");
    }
    calendar.appendChild(div);
  }
}

// ================= DARK MODE =================
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

darkToggle.onclick = () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
};
function calculateStreak(habit) {
  let streak = 0;
  let date = new Date();

  while (true) {
    const key = date.toLocaleDateString();
    if (habit.history[key]) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}
function renderProgress() {
  const bar = document.getElementById("progress-bar");
  if (habits.length === 0) {
    bar.style.width = "0%";
    return;
  }

  const done = habits.filter(h => h.completedToday).length;
  const percent = (done / habits.length) * 100;
  bar.style.width = percent + "%";
}




resetDaily();
renderHabits();
renderCalendar();
renderStats();
