 function company(id,name,email,owner,phoneNumber,location){
    this.id = id;
    this.name = name;
    this.email = email;
    this.owner = owner;
    this.phoneNumber = phoneNumber;
    this.location = location;
}

const comp1 = new company('0001','Acme','acme@yahoo.com','Yosemite Sam','(800)111-1111','California');
const comp2 = new company('0002','Nike','nike@gmail.com','Phil Knight','(800)111-1112','Oregon');
const comp3 = new company('0003','HBO','HBO@msn.com','Richard Plepler','(800)111-1113','California');
const comp4 = new company('0004','Apple','apple@apple.com','Tim Cook','(800)111-1114','California');
const comp5 = new company('0005','Blundstone','blundstone@yahoo.com','Steve Gunn','(800)111-1115','Tasmania');
const comp6 = new company('0006','Google','google@gmail.com','Sundar Pichai','(800)111-1116','California');
const comp7 = new company('0007','Warner Brothers','WarnerBros@yahoo.com','David Zaslav','(800)111-1117','California');
const comp8 = new company('0008','Cotopaxi','cotopaxi@gmail.com','Davis Smith','(800)111-1118','Utah');
const comp9 = new company('0009','Lulu Lemon','Lulu@gmail.com','Michael Aragon','(800)111-1119','California');
const comp10 = new company('0010','Subaru','Subaru@gmail.com','Tomomi Nakamura','(800)111-1121','Japan');
const comp11 = new company('0011','Twitter','Twitter@twitter.com','Elon Musk','(800)111-1127','California');
const comp12 = new company('0012','Facebook','facebook@facebook.com','Mark Zuckerburg','(800)111-1318','California');
const comp13 = new company('0013','Chaco','chaco@gmail.com','Mark Paigen','(800)131-1119','Colorado');
const comp14 = new company('0014','Ford','Ford@gmail.com','Henry Ford','(800)118-1121','Michigan');
const fakeData = [comp1,comp2,comp3,comp4,comp5,comp6,comp7,comp8,comp9,comp10,comp11,comp12,comp13,comp14];

module.exports = {fakeData,}; //preparing data for being exported/imported


