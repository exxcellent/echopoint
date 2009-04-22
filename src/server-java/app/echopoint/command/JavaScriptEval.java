package echopoint.command;

import nextapp.echo.app.Command;

/**
 * <code>JavaScriptEval</code> can be used to <code>eval</code> some arbitary
 * JavaScript on the client.
 * <p>
 * The javascript must be in a form ready for the eval() function.
 */
public class JavaScriptEval implements Command {
    private String javaScript;

	/**
	 * Constructs a <code>JavaScriptEval</code>
	 *
	 * @param javaScript - the JavaScript text to <code>eval</code>
	 */
    public JavaScriptEval(String javaScript) {
        this.javaScript = javaScript;
    }


	/**
	 * @return Returns the javaScript.
	 */
    public String getJavaScript() {
        return javaScript;
    }


	/**
	 * @param javaScript - The javaScript to set.
	 */
    public void setJavaScript(String javaScript) {
        this.javaScript = javaScript;
    }
}
