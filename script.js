$(document).ready(function() {
    fetchProducts();

    $("#addProduct").click(function() {
        $("#popupForm").show(500);
    });

    $("#cancel").click(function() {
        $("#popupForm").hide(500);
    });

    $("#addProductForm").on("submit", function(event) {
        event.preventDefault();
        addProduct();
    });

    $("#cancelUpdate").click(function() {
        $("#updateForm").hide(500);
    });

    $("#closeView").click(function() {
        $("#viewForm").hide(500);
    });

    $(".products").on("click", ".delete-btn", function() {
        var productId = $(this).data("id");
        deleteProduct(productId);
    });

    $(".products").on("click", ".update-btn", function() {
        var productId = $(this).data("id");
        fetchProduct(productId, "update");
    });

    $(".products").on("click", ".view-btn", function() {
        var productId = $(this).data("id");
        fetchProduct(productId, "view");
    });

    function fetchProducts() {
        $.ajax({
            url: "getProducts.php",
            type: "GET",
            dataType: "json",
            success: function(data) {
                $(".products").empty();
                $.each(data, function(index, product) {
                    var productHTML = `
                        <div class="data-container">
                            <div class="img-pr">
                                <img src="uploads/${product.image}" id="image">
                            </div>
                            <div class="infos-pr">
                                <h2>${product.name}</h2>
                                <p>${product.description}</p>
                                <p id="price">Price: <strong> ${product.price} USD <span id="fake-price">${Number(product.price)+100} USD</span></strong></p>
                                <div class="btns-pr">
                                    <a href="#" class="view-btn" data-id="${product.id}"><i class="fa-regular fa-eye" id="view-btn"></i></a>
                                    <a href="#" class="update-btn" data-id="${product.id}"><i class="fa-regular fa-pen-to-square" id="update-btn"></i></a>
                                    <a href="#" class="delete-btn" data-id="${product.id}"><button id="delete-btn">delete</button></a>
                                </div>
                            </div>
                        </div>
                    `;
                    $(".products").append(productHTML);
                });
            }
        });
    }

    function addProduct() {
        var formData = new FormData($("#addProductForm")[0]);

        $.ajax({
            url: "addProduct.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                console.log(response);
                $("#popupForm").hide(500);
                fetchProducts();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }

    function fetchProduct(productId, action) {
        $.ajax({
            url: "getProduct.php",
            type: "GET",
            data: { id: productId },
            dataType: "json",
            success: function(product) {
                if (action === "update") {
                    $("#updateId").val(product.id);
                    $("#updateName").val(product.name);
                    $("#updateDescription").val(product.description);
                    $("#updatePrice").val(product.price);
                    $("#updateForm").show(500);
                } else if (action === "view") {
                    $("#viewName").text(product.name);
                    $("#viewDescription").text(product.description);
                    $("#viewPrice").text("Price: " + product.price);
                    $("#viewImage").attr("src", "uploads/" + product.image);
                    $("#viewForm").show(500);
                }
            }
        });
    }

    $("#updateProductForm").on("submit", function(event) {
        event.preventDefault();
        var formData = new FormData($("#updateProductForm")[0]);

        $.ajax({
            url: "updateProduct.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                console.log(response);
                $("#updateForm").hide(500);
                fetchProducts();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    });

    function deleteProduct(productId) {
        $.ajax({
            url: "deleteProduct.php",
            type: "POST",
            data: { id: productId },
            success: function(response) {
                console.log(response);
                fetchProducts();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }

    $(window).scroll(function() {
        if($(this).scrollTop() > 200) {
            $('.up').fadeIn();
        }else {
            $('.up').fadeOut();
        }
    });
    $('.up').click(function() {
        $('html, body').animate({scrollTop : 0}, 800);
        return false;
    });

});
