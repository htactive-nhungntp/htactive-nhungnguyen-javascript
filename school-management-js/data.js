 const Student = [{
     "id": 1,
     "name": "Nguyen Thi Nhung",
     "dob": "17/05/1998",
     "phone_number": "0936784237",
     "class": "PNV20A"

 }, {
     "id": 2,
     "name": "Nguyen Thi Ngoc",
     "dob": "17/05/1998",
     "phone_number": "0936784237",
     "class": "PNV20A"

 }, {
     "id": 3,
     "name": "Nguyen Thi Nga",
     "dob": "17/05/1998",
     "phone_number": "0936784237",
     "class": "PNV20A"

 }, {
     "id": 4,
     "name": "Nguyen Thi Phuong ",
     "dob": "17/05/1998",
     "phone_number": "0936784237",
     "class": "PNV20A"

 }]

 const Teacher = [{
     "id": 1,
     "name": "Tran Thi Hang",
     "dob": "17/05/1998",
     "phone_number": "0936784237",
     "class": "PNV20A"

 }, {
     "id": 2,
     "name": "Nguyen Van Huy",
     "dob": "17/05/1998",
     "phone_number": "0936784237",
     "class": "PNV20A"

 }, {
     "id": 3,
     "name": "Vo Thi Nhi",
     "dob": "17/05/1998",
     "phone_number": "0936784237",
     "class": "PNV20A"

 }, {
     "id": 4,
     "name": "Nguyen Van Quan",
     "dob": "17/05/1998",
     "phone_number": "0936784237",
     "class": "PNV20A"

 }]

 const Class = [{
     "id": 1,
     "room-number": "206"


 }, {
     "id": 2,
     "room-number": "406"


 }, {
     "id": 3,
     "room-number": "207"


 }, {
     "id": 4,
     "room-number": "112"


 }]

 const Subject = [{
     "id": 1,
     "subject-name": "English"
 }, {
     "id": 2,
     "subject-name": "Maths"
 }, {
     "id": 3,
     "subject-name": "IT"
 }, {
     "id": 4,
     "subject-name": "Geography"
 }]

 const Score = [{
     "subject-id": 1,
     "name": "Nguyen Thi Nga",
     "score": 7
 }, {
     "id": 2,
     "name": "Nguyen Thi Nhung",
     "score": 8
 }, {
     "id": 3,
     "name": "Nguyen Thi Phuong",
     "score": 6
 }, {
     "id": 4,
     "name": "Nguyen Thi Ngoc",
     "score": 9
 }]

 localStorage.setItem('hocsinh', JSON.stringify(Student));
 localStorage.setItem('giaovien', JSON.stringify(Teacher));
 localStorage.setItem('lophoc', JSON.stringify(Class));
 localStorage.setItem('monhoc', JSON.stringify(Subject));
 localStorage.setItem('diem', JSON.stringify(Score));