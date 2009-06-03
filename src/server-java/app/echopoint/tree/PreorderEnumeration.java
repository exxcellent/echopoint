package echopoint.tree;

import java.util.Enumeration;
import java.util.Stack;
import java.util.Vector;
import java.io.Serializable;

/**
 * An enumeration used to traverse the subtree rooted at
 * a node in preorder. The first node returned by the enumeration's
 * <code>nextElement()</code> method is the node from which the enumeration
 * was created.
 *
 * @author Brad Baker, Rakesh Vidyadharan 2009-05-29
 * @version $Id$
 * @since 3.0.0b3
 */
public final class PreorderEnumeration
    implements Enumeration<TreeNode>, Serializable
{
  private static final long serialVersionUID = 1l;

  protected Stack<Enumeration<TreeNode>> stack = new Stack<Enumeration<TreeNode>>();

  /**
   * Create a new enumeration for the specified node.
   *
   * @param rootNode The node for which a pre-order enumeration is to be
   *   returned.
   */
  public PreorderEnumeration( final TreeNode rootNode )
  {
    super();
    final Vector<TreeNode> v = new Vector<TreeNode>( 1 );
    v.addElement( rootNode );
    stack.push( v.elements() );
  }

  /** {@inheritDoc} */
  public boolean hasMoreElements()
  {
    return !stack.empty() && stack.peek().hasMoreElements();
  }

  /** {@inheritDoc} */
  public TreeNode nextElement()
  {
    final Enumeration<TreeNode> enumer = stack.peek();
    final TreeNode node = enumer.nextElement();
    final Enumeration<TreeNode> children = node.children();

    if ( !enumer.hasMoreElements() )
    {
      stack.pop();
    }

    if ( children.hasMoreElements() )
    {
      stack.push( children );
    }

    return node;
  }
}
