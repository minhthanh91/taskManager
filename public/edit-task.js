const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id: taskID, completed, name } = task;

    $('.task-edit-id').text(taskID);
    $('.task-edit-name').val(name);
    tempName = name;
    if (completed) {
      $('.task-edit-completed').prop('checked', true);
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

$('.single-task-form').submit(async (e) => {
  e.preventDefault();
  try {
    const taskName = $('.task-edit-name').val();
    const taskCompleted = $('.task-edit-completed').prop('checked');

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });

    const { _id: taskID, completed, name } = task;

    $('.task-edit-id').text(taskID);
    $('.task-edit-name').val(name);
    tempName = name;
    if (completed) {
      $('.task-edit-completed').prop('checked', true);
    }
    $('.form-alert')
      .css('display', 'block')
      .text(`success, edited task`)
      .addClass('text-success');
  } catch (error) {
    console.error(error);
    $('.task-edit-name').val(tempName);
    $('.form-alert').css('display', 'block').text(`error, please try again`);
  }
  setTimeout(() => {
    $('.form-alert').css('display', 'none').removeClass('text-success');
  }, 3000);
});
