'use strict';

jQuery(document).ready(function(){
    let today = new Date();
    let mounth = (today.getMonth) ? '0'+String(today.getMonth()+1): String(today.getMonth());
    let day = (today.getDate() < 10) ? '0'+String(today.getDate()): String(today.getDate());
    today = '2021-' + mounth +'-' + day;
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let taskname = document.getElementById('taskname');
    let textDesc =document.getElementById('description');
    let date = document.getElementById('date');
    let addBtn = document.getElementById('addToTask');
    let textNames = document.getElementById('nameOfTeammate');
    let mainBtn = document.getElementById('mainBtn');
    let errormes = document.getElementById('errormessage');
    let errordescription = document.getElementById('errordescription');
    let all = 3;
    $(taskname).keyup(function(){
        let text = $(this).val();
        if (tasks){
            for (let name of tasks){
                if (text == name.name) text = false;
            }
        }
        
        if (text.length < 20 && text.length >= 5 && text){
            $(this).removeAttr('class', 'error');
            $(this).attr('class', 'valid');
            $(errormes).text('');
            $(errordescription).text('');
        } else {
            $(this).removeAttr('class', 'valid');
            $(this).attr('class', 'error');
            $(errormes).text('исправьте красное поле:(');
            errordescription.innerText = text ? 'в названии от 5 до 20 символов!)': 'задача с этим названием уже существует или не может существовать!';
        }
    });
    $(textDesc).keyup(function(){
        let text = $(this).val();
        if (text.length >= 3){
            $(this).removeAttr('class', 'error');
            $(this).attr('class', 'valid');
            $(errormes).text('');
            $(errordescription).text('');
        } else {
            $(this).removeAttr('class', 'valid');
            $(this).attr('class', 'error');
            $(errormes).text('исправьте красное поле:(');
            $(errordescription).text('больше трех символов в описание, пожалуйста(');
        }
    });
    $(date).change(function(){
        let dateData = $(date).val();
        if (dateData.length === 10 && (dateData.slice(0, 4) === '2021' && today <= dateData)){
            $(errormes).text('');
            $(this).removeAttr('class', 'error');
            $(this).attr('class', 'valid');
            $(errordescription).text('');
        } else {
            $(this).removeAttr('class', 'valid');
            $(this).attr('class', 'error');
            $(errormes).text('исправьте красное поле:(');
            $(errordescription).text('прошлое не изменить, спланировать выйдет лишь обозримое будущее, введите корректную дату на этот год, спасибо');
        }
    });
    $(addBtn).click(function(event){
        event.preventDefault();
        if ($(addBtn).text() === 'не добавлять'){
            $(textNames).removeAttr('class', 'error');
            $(textNames).val('');
            $(textNames).hide();
            $(addBtn).text('добавить участников');
            all--;
        } else if ($(addBtn).text() === 'добавить участников'){
            all++;
            $(textNames).show();
            $(addBtn).text('не добавлять');
        }
    });
    $(textNames).keyup(function(){
        let text = $(this).val();
        if (text.length >= 3){
            $(this).removeAttr('class', 'error');
            $(this).attr('class', 'valid');
            $(errormes).text('');
            $(errordescription).text('');
        } else{
            $(this).removeAttr('class', 'valid');
            $(this).attr('class', 'error');
            $(errormes).text('исправьте красное поле:(');
            $(errordescription).text('хотя бы три буквы:(');
        } 
    });
    $(mainBtn).click(function(event){
        event.preventDefault();
        if ($('.error').length != 0) return $(errordescription).text('задача будет добавлена только после исправления');
        if ($('.valid').length < all) return $(errordescription).text('заполните форму полностью, пожалуйста!');
        let task = {};
        task.name = $(taskname).val();
        task.date = $(date).val();
        task.description = $(textDesc).val();
        task.team = $(textNames).val();
        console.log(task);
        tasks = tasks ? tasks: [];
        for (let i = 0; i < tasks.length; i++){
            if (tasks[i].name == task.name) return $(errordescription).text('точно с таким именем задача уже существует');
        }
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        $(errordescription).text('задача добавлена!)');
        
    })
})
