const stepIdxEl=document.getElementById('stepIdx')
const stepsEls=document.querySelectorAll('.steps .step')
let step=1
const showStep=n=>{step=n;stepIdxEl.textContent=n;document.getElementById('step-1').style.display=n===1?'block':'none';document.getElementById('step-2').style.display=n===2?'block':'none';document.getElementById('step-3').style.display=n===3?'block':'none';stepsEls.forEach((el,i)=>el.classList.toggle('active',i===n-1))}

document.getElementById('toStep2').addEventListener('click',()=>showStep(2))
document.getElementById('back1').addEventListener('click',()=>showStep(1))
document.getElementById('toStep3').addEventListener('click',()=>{updateSummary();showStep(3)})
document.getElementById('back2').addEventListener('click',()=>showStep(2))
function updateSummary(){const plan=document.getElementById('plan').value;const map={basic:['Basic — Không cam kết','199,000₫'],standard:['Standard — Cam kết 6 tháng','149,000₫'],premium:['Premium — Cam kết 12 tháng','119,000₫']};const info=map[plan]||map.standard;document.getElementById('summaryPlan').textContent=info[0];document.getElementById('summaryPrice').textContent=info[1];document.getElementById('sidePlan').textContent=info[0];document.getElementById('sidePrice').textContent=info[1]}
const form=document.getElementById('joinForm')
form.addEventListener('submit',e=>{e.preventDefault();clearErrors();let ok=true;const required=['lastName','firstName','email','phone','dob','postcode'];required.forEach(id=>{const el=document.getElementById(id);if(!el.value||el.value.trim().length===0){setError(id,'Trường này bắt buộc');ok=false}});const agree=document.getElementById('agree');if(!agree.checked){setError('agree','Bạn phải đồng ý với điều khoản');ok=false}if(!ok){showStep(1);return}alert('Đăng ký thành công! Email xác nhận đã gửi tới '+document.getElementById('email').value);form.reset();updateSummary();showStep(1)})
function setError(field,msg){const el=document.querySelector('[data-for="'+field+'"]');if(el)el.textContent=msg}
function clearErrors(){document.querySelectorAll('.error').forEach(e=>e.textContent='')}
document.getElementById('plan').addEventListener('change',updateSummary)
updateSummary()
