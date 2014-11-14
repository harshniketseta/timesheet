module TasksHelper

  def set_project
    begin
      @project = Project.find(params[:project_id])
    rescue ActiveRecord::RecordNotFound => e
      redirect_to projects_path, :alert => "Project not found" and return if @project.nil?
    end
  end
end
