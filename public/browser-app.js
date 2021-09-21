// Load tasks from /api/tasks
const showTasks = async () => {
  $('.loading-text').css('visibility', 'visible');
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks');
    if (tasks.length < 1) {
      $('.tasks').html('<h5 class="empty-list">No tasks in your list</h5>');
      $('.loading-text').css('visibility', 'hidden');
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && 'task-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;
      })
      .join('');
    $('.tasks').html(allTasks);
  } catch (error) {
    $('.tasks').html(error);
    //'<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  $('.loading-text').css('visibility', 'hidden');
};

showTasks();

// delete task /api/tasks/:id

$('.tasks').click(async (e) => {
  const el = $(e.target);
  if (el.hasClass('delete-btn')) {
    $('.loading-text').css('visibility', 'visible');
    const id = el.parent().data('id');
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  $('.loading-text').css('visibility', 'hidden');
});

// add task

$('.task-form').submit(async (e) => {
  e.preventDefault();
  const name = $('.task-input').val();

  try {
    await axios.post('/api/v1/tasks', { name });
    showTasks();
    $('.task-input').val('');
    $('.form-alert')
      .css('display', 'block')
      .text(`success, task added`)
      .addClass('text-success');
  } catch (error) {
    $('.form-alert').css('display', 'block').html(error);
  }
  setTimeout(() => {
    $('.form-alert').css('display', 'none').removeClass('text-success');
  }, 3000);
});
