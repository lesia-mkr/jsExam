'use strict';
jQuery(document).ready(function(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let table = document.getElementById('table');
    let sortBtn = document.getElementById('pick');
    let delBtn = document.getElementById('del');
    let id = '';
    if (!$(tasks).length || !$(tasks)) {
        $('#taskList span').text('нет задач');
        $('#del').hide();
    } else {
        $('#del').show();
        genTabl(tasks, 'old');
        setChose();
    }

    function sortByParam(name, array, atr){
        let sortingFromOld = (a, b) => a[name].localeCompare(b[name]);
        let sortingFromNew = (a, b) => b[name].localeCompare(a[name]);
        if (atr === 'old') return array.sort(sortingFromOld);
        else if (atr === 'new') return array.sort(sortingFromNew);
    }
    function genTabl(arr, atr){
        let sortedTasks = sortByParam('date', arr, atr);
        for (let task of $(sortedTasks)){
        $(table).append($(`<tr class='tab'>
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>${task.date}</td>
        <td>${task.team}</td>
        </tr>`));
        }
    }
    $(sortBtn).click(function(event){
        if (event.target.id === 'old' || event.target.id === 'new' ){
            $('.tab').detach();
            id = event.target.id;
            genTabl(tasks, event.target.id);
            setChose();
        }
    })
    function setChose(){
        $('.tab').click(function(){
            if ($(this).hasClass('chosen')) return ($(this).removeClass('chosen'));
            $(this).addClass('chosen');
        });
    }
    $(delBtn).click(function(){
        if (!$('.chosen').length) return $('#taskList span').text('задачи не выбраны');
        for (let task of $('.chosen')){
            console.log($(task).children().first().text());
            let taskName = $(task).children().first().text();
            for (let i = tasks.length - 1; i >= 0; i--){
                if (tasks[i].name === taskName) tasks.splice(i, 1);
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        $('.tab').detach();
        genTabl(tasks, 'old');
        setChose();
    })
});
