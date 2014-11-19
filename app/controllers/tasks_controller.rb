class TasksController < ApplicationController

  include TasksHelper

  before_action :set_project

  def index
    @tasks = @project.tasks
  end

  def create
    begin
      # estimated_time = Task.preprocess_params(time_params)
      @task = @project.tasks.new(task_params)
      @task.assignor_id = current_user.id
      # @task.estimated_time_for_completion = estimated_time
      @task.save!
      redirect_to request.referrer, :notice => "Task created successfully."
    rescue => e
      redirect_to request.referrer, :alert => [e.message]
    end
  end

  def edit
    @task = @project.tasks.find(params[:id])
    render :layout => false
  end

  def update

  end

  private

  def task_params
    params[:task].present? ? params.require(:task).permit([:title, :description, :assigned_id, :priority, :from_date, :to_date, :estimated_time_for_completion]) : {}
  end

  # def time_params
  #   params[:time].present? ? params.require(:time).permit([:to_complete_hours, :to_complete_minutes]) : {}
  # end
end
