class TasksController < ApplicationController

  include TasksHelper

  before_action :set_project

  def index
    @tasks = @project.tasks
  end

  def create
    task_params = Task.preprocess_params(task_params, current_user)
    @task = @project.tasks.create(task_params)
    redirect_to request.referrer, :notice => "Task created successfully."
  end

  private

  def task_params
    params[:task].present? ? params.require(:task).permit([:title, :description, :assigned_id, :priority, :to_complete_hours, :to_complete_minutes]) : {}
  end

end
