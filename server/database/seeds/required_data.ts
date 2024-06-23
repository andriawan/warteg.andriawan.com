import { Password } from "@server/utils/hash";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

  const checkExist = await knex('users').where('id' , 0 ).first()

  if( !checkExist ){
    await knex("users").insert([
      {  id:0 , first_name: "HeLizCooLZ" ,last_name:'' , username:'HeL', email:'hel@admin.com' , password: Password.hashPassword('1') },
    ]);

    await knex('items').insert([
      {  name: "Nasi" ,description:'Nasi enak' , price: 5000 , category:'FOOD' , image_url:'https://s3-publishing-cmn-svc-prd.s3.ap-southeast-1.amazonaws.com/article/tNfHyQoqdiHD3zSvGm2vt/original/066452800_1565249003-Mengenal-Manfaat-Nasi-Dingin-untuk-Penderita-Diabetes-By-K321-Shutterstock.jpg' },
      {  name: "Tahu" ,description:'Tahu enak rasanya' , price: 500 , category:'FOOD' , image_url:'https://img-global.cpcdn.com/recipes/dd3537648934525a/1360x964cq70/tahu-kuning-goreng-foto-resep-utama.webp' },
      {  name: "Tempe" ,description:'w' , price: 500 , category:'FOOD' , image_url:'https://cdn.idntimes.com/content-images/community/2023/03/1280px-tempe-goreng-41de55f2c34bd9d1bd2b234d79dab910-36f9c674d11bb8c1d85b2399ca2f4bcb.jpg' },
      {  name: "Sayur Kangkung" ,description:'sayur favorit' , price: 2500 , category:'FOOD' , image_url:'https://res.cloudinary.com/dk0z4ums3/image/upload/v1610428714/attached_image/5-manfaat-kangkung-yang-sayang-dilewatkan.jpg' },
      {  name: "Sayur Sop" ,description:'w' , price: 2000 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxO31ZOoboMzKVr_ecsu8BvktoJx782bJohQ&usqp=CAU' },
      {  name: "Tongkol" ,description:'w' , price: 3000 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXKHQEzSC4eSkuCW1K7ah6Eo2BBWRD9lAkQ&usqp=CAU' },
      {  name: "Perkedel" ,description:'w' , price: 1500 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLxyX8GLnP6UlFyXAQmhuaoh-De8kHbLy8Tg&usqp=CAU' },
      {  name: "Sayur Kacang Panjang" ,description:'w' , price: 2500 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBD2eqP_d60cgx2ubfq6nv5Y9qUE9NHneKyA&usqp=CAU' },
      {  name: "Telor Ceplok" ,description:'w' , price: 2000 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVaQPS9Zil6n8XWTW_RgOU58uK25Bt-EApsA&usqp=CAU' },
      {  name: "Sayur Toge" ,description:'w' , price: 3000 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXInEJa3h7fUf4M7Ck1TAag6QsBIEY0t4mEA&usqp=CAU' },
      {  name: "Sayur Terong" ,description:'w' , price: 1000 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7BnSO7WbXmJjpiShDnqJ7AFWew_OoNhXoLQ&usqp=CAU' },
      {  name: "Sayur Cecek" ,description:'w' , price: 1500 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzUAe9lFW_HY1MGyxvCdHOhWDdiEjuORWEiA&usqp=CAU' },
      {  name: "Rolade" ,description:'w' , price: 2500 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSKTu-NR5TuFgUVcTqy932EXGW6NtlX01GxQ&usqp=CAU' },
      {  name: "Telur Balado" ,description:'w' , price: 4000 , category:'FOOD' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTol6Cxf8uwJbllab_R-qcLbkWTwPLcV2dSg&usqp=CAU' },
      {  name: "Es Teh" ,description:'w' , price: 2000 , category:'DRINK' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGK3ce111Ka7XfbD9FbWCcBCw2p_6cdUyMHA&usqp=CAU' },
      {  name: "Es Jeruk" ,description:'w' , price: 2000 , category:'DRINK' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjEeNvTdw2zY0HDkpne8QMa_HhLxApsWDUXg&usqp=CAU' },
      {  name: "Air Putih" ,description:'w' , price: 0 , category:'DRINK' , image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmpUviZwVj2dGdYE0O4x8vjNW5PjNt2i-XSA&usqp=CAU' },
    ])
  }
};
