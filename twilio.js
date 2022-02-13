require("dotenv").config();
const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

function formatPhone(phone) {
  console.log(phone);
  if (phone.startsWith("0")) {
    return phone.substring(1); //ekstrk from[position] to [position]
    // alteative way
    // let phone = data.phone.replace(/^0/g, "");
  } else if (data.phone.startsWith("+62")) {
    return phone.substring(3);
  } else {
    return phone;
  }
}

module.exports = {
  sendWa: (data) => {
    console.log(data);
    if (data.to === "mulai-belajar") {
      // for siudent
      client.messages
        .create({
          from: "whatsapp:+14155238886",
          //   body: "Your 2 code is 2, in iadalah uji coba ",
          body: `Halo *${data.student}*, \n
Selamat, kamu baru saja berhasil melakukan pembayan untuk kelas *${data.course}*.
Pengajar akan segera menghubungi kamu. Kamu juga bisa konfirmasi langsung ke pengajarnya. Berikut data kelas kamu :
 *Nama kelas:* ${data.course}
 *Jadwal kelas:* ${data.jadwal_belajar} pukul ${data.jam_belajar}
 *Preferensi belajar:* ${data.preferensi_belajar} 
 *jumlah pesanan:* ${data.jumlah}
 *Nama Pengajar:* ${data.teacher}
 *Email Pengajar:* ${data.teacher_email}
 *No. Telp Pengajar:* ${data.teacher_phone}

Jika ada pertanyaan silahkan hubungi kami di whatsapp 0812-898-8981 atau ke email help.jagokan@gmail.com,

Terima kasih.
Tim Jagokan`,
          to: "whatsapp:+62" + formatPhone(data.student_phone),
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.log(err));

      // for guru
      client.messages
        .create({
          from: "whatsapp:+14155238886",
          //   body: "Your 2 code is 2, in iadalah uji coba ",
          body: `Halo *${data.teacher}*, \n
Selamat, seorang siswa saja berhasil melakukan pembayan untuk kelas *${data.course}* kamu.
Segera hubungi siswa tersebut untuk memulai sesi pembelajaran. Berikut data pesanan kelas kamu :
*Nama kelas:* ${data.course}
*Jadwal kelas:* ${data.jadwal_belajar} pukul ${data.jam_belajar}
*Preferensi belajar:* ${data.preferensi_belajar}
*jumlah pesanan:* ${data.jumlah}
*Nama siswa:* ${data.student}
*Email Siswa:* ${data.student_email}
*No. Telp Siswa:* ${data.student_phone}

Jika ada pertanyaan silahkan hubungi kami di whatsapp 0812-898-8981 atau ke email help.jagokan@gmail.com,
 
Terima kasih.
Tim Jagokan`,
          to: "whatsapp:+62" + formatPhone(data.teacher_phone),
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.log(err));
    } else {
      return;
    }
    return;
  },
};
