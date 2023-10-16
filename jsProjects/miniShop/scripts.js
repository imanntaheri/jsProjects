class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => {
      console.log('Ordering...');
      console.log(this.items);
    };
    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    // orderButton.addEventListener('click', () => this.orderProducts());
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
      new Product(
        'A Pillow',
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMVFRUWFxcVFxUYFhcVFRUVFxUXFxUVFxUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFw8QFysdFR0tKystKy0rKy0tLS0rKy0tLS0rLS0rKy03LS0tLS03LTctLS0rLTcrNzQrKy03Ky0rLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EAEAQAAEDAgMFBQUFBgUFAAAAAAEAAhEDIQQxQQUSUWFxgZGhsfATIjLB0QYUQlLhFSNicpLxFjNTwuJjc4KDsv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAGxEBAQEBAQEBAQAAAAAAAAAAAAERAhIxIUH/2gAMAwEAAhEDEQA/AK9Gm6R7sQRwyPoJUGWA3TYHjNirtM3z/EipOgdhPq66axiuacuJAcMuKlLCA7PWNdOnNTsPkFZwTA6o1rsi++mQMDwCaYy6TrA7pggHIaKxSqkH4bTx4/3WvXq4dx3WtgXHDkdVE/BGPcuOGRzUncrXmxlMmCIJzbPDvUwwryZDDkOAWphMHcEg25Wnj5LQ9n5KXoxjDZ7yHiwBkm8yCMrK3hcGABvDeMa5StDdsiDVNq4hAgWAHZpwS9nOpUwb804aoqGph95jmxm0hYuFp6wunY1YNAGFrlmnquDWudoAT3LKxBDWibFrS6eFg35HuWpjhLHdFxf2/wAU4GjSaYFUhhIN4mP9xW2HWbLxc0zWNt74RkGs/DPM5nqrLNsUxqXQLkDNcftDGmRTBhrQLcToFJSxHu9YC5/XR1mKxzHwQCCNeXApmV8rnzyWPh6tu8/RWS+/cFrEbL67XDdcJ+V7FT0nsHLSIWK2prxMdgVnDyTYc/RUw1pUsyePPLkppjUZqrSwsZlSVcK12fK4PBRTiqNXBV8ViTMMytf6IK2CcI3feF7WB5cjmVWcS0XkGNc7qyJaJ9V5Bucs5yTOLjoeOf6oTU+ilpMc6zQTfsHUqojLHcFFSou3QI0iei06WFbPv1AOQuVoUsCywaCeJM29fJT1Dy5jFU3WsbFp8x801IEW3TmdDrzW5j6W7ItIcBI1BEwqRPyWpdSxQeDuuG679U5qE7pAOXAzl+i0GlXaDmkCLcktJGOS/wDK7uKS3RTSU9Hl5zQxUnLU5foVbZibH+U8Vg18M+nLp32i8jPtBUVLaFuz+H6pOmvLqW4j5cfopm4i/b60XNU9oHnpp9Cp/vx8eB4K6mNLeIdbJ0m2hzW5svFT7p4HwyhczhMRvEZ68eB49QtHAVIcvP1+dfj0c/vP666hcKXoqWFqyArYK2xgieMI2Ecz0UYaj3ZtkPNEw5e3QlLeHHwKZwHYFE0G51OXJDE7MQJhUhgxFnju/VTNpxYZeZQVG+9AyblzdqVZbEyKuKwxIcAWkxlMZrjvtfsDE1qlB1OmHezqAk77BAkTm4cF3Yp3DuNipdz3o5K+qeY86xGxcSJcaTonQtcewNJJR4XZ1c7sUnxM5RA6Qu5e3fJpjR47GxJKmyNQgWYAB81NXHJYfC1MvZvEWMgjsurrcJUz3TnxH1W8KN6j9CQR23Pmjcz3403ZT0mMejgn2kRnrK1KNLdEAKdtKFKxqWmITKYE+uCtOaDZRVRFZoH5VBFTJd8IJ6KPEOb8L2k6xBMc50Wji3mmxrGiC7MhRUcLp381RmV8G0D2gmNGzadD07VYfRO6Gze3SDwAsrWIbLt38I0VpmHmCU+nxTw2DAgRaR6C1Gw0FxsACp6WHGao7edFOOY80kS1i7RxPtHSMtOZ4+Sqx1RdiULo5mTSnCYqiRuLcNSkoCkmGvONo4gtpnnbgufOIPHxWptd/ugerLGM+oXCO3Sw3Ev9QpWYx2fyVLr5IgR6C0jqvsziC6Z0Md7f+K6CnZy437MYndq7vEA5HNp+hcuwfmuPf124+OgwVRabHLCwFRbFIrcYq00qQKJqkC0hQlCdOiGQRdSJmtQCxuSc2cCjhBUbcIAwzIdUf2IqFO0cblSbtoRNCAXNikRzQ0227FM5toSDUAkWKVIWR7tkTWWQA3PokW/vg4/k8ZUoZ5yiFO5KCCiwucXuvw5BTk8FM1miNlJVFajRvxKv06Z1TtbCThOZPRBLCyNumWHlB8Y+q0rjU+ay9o0i4QOWfarPqVgwn9cFeOzXHVqb9mu4jxW9jnlUmn1KY+tVd/ZzuI9diTMA6bxCbDKrMwziJDbJLbDUlPTXl4Ftl9wL5E9/9lk+sltY7APqPtAGUlKlsMficcsgIXKWOtlY28PQKW+OPmF0lPZVMG7SeslW6WFYMmAX/LdPR5YWwb1mkaBxzJ/A5d28LJo59/kVsvXPq66czFrZ9RbdBywcFmtqgVeU6X2uUrSq9NTNW2EqcIApAqh4SSTgIEAkQiCYhAxRtakAihAgE8JwEUIGARAJwEQagaEbQnARtCIdoUrUAUgVBhictQhspxTCCN/Z3qnV9eu1XqpHNUHmZRAwkE6ZVDJk6SASEkUJIPGQPNG0Jg31CJrVxdzgDtRNTBqVkEtD4rc/IrXfksfDfELcfIrZfkpWokwR5raoBYuFK2cOVeWelxpU7SoaQUwW2EgRAqMXUgQGESCUTVUE1FCYJ0CRNCQCNAgESZEAgdqMJgnQEiCFoUgCIJoUgCFqkaFQ4CeToAnARQgr1pjNZGEyd/O//wCiteuFm0mQI5k95JT+n8EkkkqhkydJEJJJJB42CU++eCp0NpUzru9RZXKdRpuCCuLsa5Twjt6lDvjjpxUUeFB3x1GvGy235LBpvAM6Ag9y3n5JVg8Ibraw7Vi4WJu3zW1hsrK8nS9TUwCgp3Vlq25nCJMnaEBBE1CEUqoMIwgajagMJwmCIBAgiCZOEBhOEzSiQEEYQBSNRBtUrVG1StVBBHCYIoRFauFk0z7wJ1+i18QFzWOpljjc3G8Ok5eCsmpbjRKSyhi3jXvCNu0DqB3q4mtIJlTG0BqCi+/svnbSM0ymxaTLCdVJMmZPNJXynp4e5hBI921szeEAniRfOck9aqCTnc9UIeAM73WHROzGVBlUd2kHzU1HatWTcERq36FUQ+2eiTH2NtBwUxdX/wBr1LzyXc4Qn2VPe+IsaT1gLziiZIaBdzgJtqY+a9OqjRY6b4HhXrawwWPg2rZw4U5Xpepqw0KCmrLVtggEQCUJwqhQkAnKcICCJC1GEBtRIEQKB0YQBFKAwiQAogiDCkaogjBQStUrVE0qRqomalKTU2qIGtkub2qPevzGeguPNdLUXPbUbmeDgO9v6K8/UvxmOCZOfVkxK6OZjr64Jk5QSgQ9ZJKNx9QUlR4Q+rz1SbUt38FC7ZZ/MhOzHfmXF2WA/wBQia7PpwTYLY1V4MPAI7Va/wAO1v8AUHcpsXKHBPHtKf8AOzT+IL06svP9j/Z6p7ekXVJDXtcRETu+98l6BWXPqunETYNbWGWTgmFbWHarydLdIKdqhphTtWmBIgEwTyqhFJJOEBBOmSlAYKeUEpyUEkpwVFKcOQTAogVDvIg5ETgowVC0owUE7SpGOVYOUlNyouNKYoabkRRCJ59/q6ydqBu5Um2RHYZz7StU3WD9pqL3UXez3d8EEb1m5w6Y5Eqz6l+MYVW6FOag4rF9lihH7im7T3ap74LU5r1AS12Hqg5ZNcOstJXVz1rl4vl3Ji7NY4xW78TKgH/bqRbO+6Am/alKT+8AyMElpAHU5ImtR5E/qUllu2lTN/aD+ofVJDXmbmoC1bG1NlVGXNN3Ue8POyyJ9f2XB6GnsD4nDkPAn6rYIXMYWsWODgDbujtXSUawe0OGvgeCx1G+alwJAqs6x2kEDzW2aLibBZmAwG9D3SADIAzMXnotelbIdpMlZaaGCw51ELRY1QYR1lZBXSRztStKmBVYPU7XKokJTyog7wT7yCQFECoSUQfkgllC43hA52fIoXOmDwBlDUxNkVN0mOUqp7aWgjindU+JwzaB5oixvW6IXvgToTCiNYTIyd6KDHP/AHR/nAQW/aImvWe+tBA5XUjKyo0GPUgeqDKykbVQXt5E1yqMqSpN9BoUnqYOWayorVOogtMzVfaFDeBb+YFp43EKZias24lEcS3DObAD3COQvyNvorZxD9XHsAlFimw94/id5lAyjOo711cxMrH/AFD2tB+aGrhw4y3c6ZX5KX7k7iExwJ4hRcVDsppuaTCTnl9Eyu/cj+ZJNTyyMRhJ0XMbX2E0kncB7L967wsCiq4QFcrHWV5LX2Nq13YQB4gK19nsA/2ji4Q1ouNHHS+Xrmuv21sQgbzGk8QOCr7KDI3CfeuSIgg9t1i63M+pwHEWBb5EKfDYa8uM8BxUr8IGQZLJ4yGn5KdlZgA99hzg7wzPakhek9Mo99U6taFXOLHHsXTGNaBqe8wDU/NSDFAkgHLzBghZNTG7oDzaLybT0BuexZeD2iXPI9nVgmQfZuAuekx2Jia6tuIuesKVz4PJUcPQccwe5alPDIqN1TMoK1WDGjhYq0cP6gn5LK2m4MH4zqAKbieyYlBKcXkf/F3UaofvW6X8I81jNri8isP/AFz5FTS2/wDm8I9mVcTV6liYgHK11JQxobJOTnEdiy3FsfDWMfwfUqI1Rl7PEWv8LO+7lcNabq26SPwzLTyKndiZPsybO3XA8w4g+CwzWER7PERn8LD/AL0XtAYtWEZTSJI/pcUw1otry5zucfRFTxGY10WY6q0CAavH/JqfRVHYsA/FUkf9CqfIFMTXQtxWqnZi1yb9pabx7aNdvnTTf4gaIBqUp51A0nsfCi67WjiVbFWZHArlcLtVrhEEzaWkOt2Fa+Gx7Cfig8HDdJ781NVrNqKahicxwKpNddCwkEnig6LC1wdVYqeisTD1RqtihiG5TKI5Ss+S53Ek95lRkrfxeyg5xIETex4+CysXs4sEgz/Dr4LpLGLKqtqEZEhG3GOGs9igDklUWvvvJJVUlMNq2AkBknGiabhc3QQOSp4zY1Oo5tT4XggyMjBFiOeSPE4kMibk5D5nuVR+Jc6CTqbadyuabibFbOolxc4CXTJBv0ssrFfZzAVvipBx0dFx2lXA+3ao6Ig9D6808pqlhfs3h6chrABNolvSwNldGDYLRyzKnnPqhebnoD67lpEbaTRoOBUrWCOn1SIueiNo8Qip2PIFie/RWmYp3VV6FEntBC0KNEADjkpSHfVqEWAHbdZtaZlwdORkEyJtf1mtUJvkpq4yA4cv0Sn69i1X02nMAnooX4JhykdDp2q6YohJrR9FYds4/hcOMEfMFQVqL2gy3K8gTz49VdTDho0T7vrgVFTMjyUjX+roCDEjTHDyS58bImlEB7IahA7CMObQewKYH1CUoM8/ZjBPMvw1Jx4lgPyV7D/ZzDNEMZuj8rXO3f6ZjwUgKJruCliyhOwmj4Kj29DbuQ/s6sMq4PJzB8lZZiTxRffOICnlfSGjRrjP2Tuhc3wgq7Sc7VsdoKjGMHBF95bzU8mtAV2gRmqxqZctOKhGIbxSGIZxVw1Xq4EG4sfA9ipFhFiLha4rN4qltINMOBuIB0tp4+a1KzVSE6YDmnWmUDtpC0NPXLwUX7QdawE9Skks41qWnTDzvOmbdMiFM7AN4uF+I48wkks1UdTZ5/C4cYIjic/0VKCC4EQRFrctQUklZSn387xafD9FIDJnl605pJKoNoy9cEbBkkkg0MIc+RHkrh1SSWa1DlMUklFME7UkkBApqsBruAB7oKSSDDozHT6f2Rh4v9EklthI0zPNO0z2pkkD76cO8EySqCn6qRJJAiPHzTEEmydJBZZgjqVMzCtHE9SnSWdawYpN4DuT7oSSUDLMxVcvsPh8+qSS1ylVdxJJJaZf/9k=',
        'A soft pillow!',
        19.99
      ),
      new Product(
        'A Carpet',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
        'A carpet which you might like - or not.',
        89.99
      )
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list')
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
