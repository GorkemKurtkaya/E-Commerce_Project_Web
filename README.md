#  E-Ticaret Sitesi

Bu proje, **Görkem Kurtkaya** ve **Ömer Fikri Gülcemal** tarafından geliştirilen bir e-ticaret sitesidir. **Ömer Fikri Gülcemal**, frontend kısmını geliştirirken **Görkem Kurtkaya**, backend kısmını geliştirmiştir.

---

## İçindekiler

1. [Proje Tanımı](#proje-tanımı)
2. [Kurulum](#kurulum)
   - [Backend Kurulumu](#backend-kurulumu)
   - [Frontend Kurulumu](#frontend-kurulumu)
3. [Kullanıcı Özellikleri](#kullanıcı-özellikleri)
4. [Admin Paneli](#admin-paneli)
5. [Teknolojiler](#teknolojiler)
6. [Ekran Görüntüleri](#ekran-görüntüleri)
7. [Geliştiriciler](#geliştiriciler)

---

## Proje Tanımı

Bu e-ticaret sitesi, kullanıcıların ürünleri görüntüleyip sepete ekleyip, satın alma işlemlerini gerçekleştirebileceği bir platformdur. Kullanıcılar, kayıt olma ve giriş yapma işlemleriyle siteye katılırken, admin paneli ile ürün yönetimi ve kullanıcı etkileşimleri takip edilebilir.

---

## Kurulum

### Backend Kurulumu

Aşağıdaki adımları izleyerek backend kısmını kurabilirsiniz:

1. **Projeyi Klonlayın**

```bash
git clone https://github.com/GorkemKurtkaya/Project_Web.git
```

2. **Backend Klasörüne Gidin**

```bash
cd Project_Web/backend
```

3. **Bağımlılıkları Yükleyin**

```bash
npm install
```  
4. **Ortam Değişkenlerini Ayarlayın**

```bash
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
``` 
5. **Uygulamayı Başlatın**

```bash
nodemon app.js
``` 

### Backend Kurulumu

Aşağıdaki adımları izleyerek frontend kısmını kurabilirsiniz:


1. **Frontend Klasörüne Gidin**

```bash
cd Project_Web/frontend
```

2. **Bağımlılıkları Yükleyin**

```bash
npm install
```  
3. **Uygulamayı Başlatın**

```bash
npm run dev
``` 

*************

# Kullanıcı Özellikleri

### Kayıt Olma ve Giriş Yapma
Kullanıcılar, sisteme kayıt olabilir ve giriş yapabilir.
****
<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/user-attachments/assets/13819d1b-2b5a-40a8-ba6f-a0ab193badd8" width="50%" />
  <img src="https://github.com/user-attachments/assets/7a6dccc8-8c4e-4989-858d-1b68aafb5388" width="50%" />
</div>

### Ana Sayfa
Kullanıcılar, ana sayfada ürünleri görebilir ve sepete ekleyebilir.
****
![image](https://github.com/user-attachments/assets/8e96baa7-a9fb-4ec7-b46a-f63151b49d0a)



### Sepete Ekleme ve Satın Alma
Kullanıcılar, sepete ürün ekleyebilir ve satın alma işlemini gerçekleştirebilir.
*****
![image](https://github.com/user-attachments/assets/ca6daf11-a541-4876-9922-59d7c1433f88)
![image](https://github.com/user-attachments/assets/4da373e4-f600-49d6-beb4-f433b9b91f65)
![image](https://github.com/user-attachments/assets/970f1798-db58-4d1e-97a5-3c080a53de64)
![image](https://github.com/user-attachments/assets/14852082-6e5d-4078-aff5-4daa5f2aada5)




### Kullanıcı Profili
Kullanıcılar, profil bilgilerini güncelleyebilir ve geçmiş siparişlerini görüntüleyebilir.
***
![image](https://github.com/user-attachments/assets/2e15c324-83de-442f-b9ff-ac78ab34d741)
****
![image](https://github.com/user-attachments/assets/af436d34-daed-41ac-baf8-6be49de7b6a6)



---

# Admin Paneli

### Admin Girişi
Admin, giriş yaparak yönetici paneline erişebilir.

***
![image](https://github.com/user-attachments/assets/5022aff0-b2ec-4230-922b-cc0cc69fc6ab)





### Satın Alınan Ürünler ve Kullanıcı Etkileşimleri
Admin, satın alınan ürünleri ve kullanıcıların hangi ürünlerle etkileşime girdiğini görebilir.

---

# Teknolojiler

Bu projede kullanılan başlıca teknolojiler şunlardır:

## Backend
- **Node.js**: JavaScript ile backend geliştirmek için kullanıldı.
- **Express**: Web uygulaması oluşturmak için kullanılan framework.
- **MongoDB**: NoSQL veritabanı olarak kullanıldı.
- **Mongoose**: MongoDB ile etkileşim için kullanıldı.
- **Stripe**: Ödeme işlemleri için kullanıldı.
- **jsonwebtoken**: JWT tabanlı kimlik doğrulama için kullanıldı.
- **bcrypt**: Şifreleme için kullanıldı.
- **cloudinary**: Ürün resimlerinin bulut ortamında saklanması için kullanıldı.

## Frontend
- **React.js**: Kullanıcı arayüzünü oluşturmak için kullanıldı.
- **Vite**: Geliştirme ve yapılandırma için kullanılan build aracı.
- **Tailwind CSS**: UI tasarımı için kullanılan stil çerçevesi.
- **Material UI**: UI bileşenleri için kullanıldı.
- **React Stripe Checkout**: Stripe ödeme işlemcisiyle entegre olabilmek için kullanıldı.

---

# Geliştiriciler
- **Görkem Kurtkaya**: Backend geliştiricisi
- **Ömer Fikri Gülcemal**: Frontend geliştiricisi

---

# GitHub Reposu

Backend ve frontend kodlarına GitHub üzerinden ulaşabilirsiniz:

- [Backend Repository]([https://github.com/GorkemKurtkaya/Project_Web](https://github.com/GorkemKurtkaya/E-Commerce_Project_Web/tree/main/backend))
- [Frontend Repository]([https://github.com/GorkemKurtkaya/Project_Web](https://github.com/GorkemKurtkaya/E-Commerce_Project_Web/tree/main/frontend))

# ISC Lisansı

Bu proje, **ISC Lisansı** altında lisanslanmıştır.

Copyright (c) 2024, Görkem Kurtkaya ve Ömer Fikri Gülcemal.



