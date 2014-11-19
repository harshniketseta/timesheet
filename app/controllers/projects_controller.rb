class ProjectsController < ApplicationController

  include ProjectsHelper

  before_action :set_type, only: [:index]
  before_action :set_project, only: [:show, :destroy]

  def new

  end

  def create
    begin
      @project = Project.create(project_params)
      redirect_to project_path(@project)
    rescue StandardError => e
      redirect_to new_project_path, :alert => [e.message]
    end
  end

  def edit
    @project = Project.find(params[:id])
    render :layout => false
  end

  def update
    begin
      @project = Project.find(params[:id])
      if @project.update_attributes(project_params)
        redirect_to project_path(@project)
      else
        redirect_to edit_project_path(@project), :alert => "Project cannot be updated"
      end
    rescue => e
      redirect_to edit_project_path(@project), :alert => [e.message]
    end
  end

  def index
    if @type == "deleted"
      @projects = Project.unscoped.where(:trashed => true)
    elsif @type == "latest"
      @projects = Project.all
    else
      @projects = Project.all
    end
  end

  def show
    @project = Project.find(params[:id])
  end

  def destroy
    begin
      @project.destroy!
      redirect_to projects_path
    rescue => e
      redirect_to projects_path, :alert => [e.message]
    end
  end

  def restore
    begin
      @project = Project.unscoped.find(params[:id])
      @project.undestroy!
      redirect_to project_path(@project)
    rescue => e
      redirect_to project_path(@project), :alert => [e.message]
    end
  end

  private

  def project_params
    params[:project].present? ? params.require(:project).permit([:name, :description]) : {}
  end
end
