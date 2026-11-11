// عدّلي البيانات من هنا فقط
const wedding = {
  bride: "اسم العروس",
  groom: "اسم العريس",
  date: "2027-06-18T19:00:00", // YYYY-MM-DDTHH:mm
  venue: "اسم القاعة",
  address: "المدينة – العنوان بالتفصيل",
  map: "https://maps.google.com"
};
const whatsappNumber = ""; // اكتبي الرقم بكود الدولة بدون + مثال: 201xxxxxxxxx

document.getElementById("brideName").textContent = wedding.bride;
document.getElementById("groomName").textContent = wedding.groom;
document.getElementById("venueName").textContent = wedding.venue;
document.getElementById("venueAddress").textContent = wedding.address;
document.getElementById("mapLink").href = wedding.map;

const eventDate = new Date(wedding.date);
const arabicDigits = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
document.getElementById("day").textContent = arabicDigits(eventDate.getDate());
document.getElementById("month").textContent = new Intl.DateTimeFormat("ar-EG",{month:"long"}).format(eventDate);
document.getElementById("year").textContent = arabicDigits(eventDate.getFullYear());
document.getElementById("weekday").textContent = new Intl.DateTimeFormat("ar-EG",{weekday:"long"}).format(eventDate);
document.getElementById("time").textContent = new Intl.DateTimeFormat("ar-EG",{hour:"2-digit",minute:"2-digit"}).format(eventDate);

function tick(){
  let diff = Math.max(0, eventDate.getTime() - Date.now());
  const vals = [Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
  ["days","hours","minutes","seconds"].forEach((id,i)=>document.getElementById(id).textContent=arabicDigits(String(vals[i]).padStart(2,"0")));
}
tick(); setInterval(tick,1000);

const gateScreen = document.getElementById("gateScreen");
document.getElementById("openGate").addEventListener("click",()=>{
  gateScreen.classList.add("opening");
  setTimeout(()=>{
    gateScreen.classList.add("fade");
    setTimeout(()=>{
      gateScreen.style.display="none";
      const invitation=document.getElementById("invitation");
      invitation.classList.remove("hidden");
      document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
      window.scrollTo({top:0,behavior:"smooth"});
    },850);
  },1250);
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  });
},{threshold:.12});

document.getElementById("rsvpForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("guestName").value.trim();
  const count=document.getElementById("guestCount").value;
  const message=`مرحبًا، أنا ${name}. أؤكد حضوري لحفل زفاف ${wedding.bride} و${wedding.groom}، وعدد الحضور ${count}.`;
  if(!whatsappNumber){alert("أضيفي رقم واتساب في ملف script.js أولًا.");return;}
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});
