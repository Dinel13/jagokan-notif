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
          body: `Halo *${data.student}*,
Kami dari tim Jagokan,

Selamat, kamu telah berhasil melakukan pembayan kelas di Jagokan.
Berikut data pesanan kelas kamu :
 *Nama kelas:* ${data.course}
 *Jadwal kelas:* ${data.jadwal_belajar} pukul ${data.jam_belajar}
 *Preferensi belajar:* ${data.preferensi_belajar} 
 *jumlah pesanan:* ${data.jumlah}
 *Nama Pengajar:* ${data.teacher}
 *Email Pengajar:* ${data.teacher_email}
 *No. Telp Pengajar:* ${data.teacher_phone}

Pengajar akan menghubungi anda untuk memulai sesi pembelajaran.

Jika ada pertanyaan silahkan hubungi kami di whatsapp 082346462435 atau ke email jagokan.id@gmail.com,

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
          body: `Halo *${data.teacher}*,
Kami dari tim Jagokan,

Selamat, kamu telah mendapatkan pesanan kelas baru dari seorang murid di Jagokan.
Segera hubungi murid tersebut untuk memulai sesi pembelajaran.
 *Nama kelas:* ${data.course}
 *Jadwal kelas:* ${data.jadwal_belajar} pukul ${data.jam_belajar}
 *Preferensi belajar:* ${data.preferensi_belajar}
 *jumlah pesanan:* ${data.jumlah}
 *Nama siswa:* ${data.student}
 *Email Siswa:* ${data.student_email}
 *No. Telp Siswa:* ${data.student_phone}

Jika ada pertanyaan silahkan hubungi kami di whatsapp 082346462435 atau ke email jagokan.id@gmail.com,
 
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
