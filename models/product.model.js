var Product = require('./config/product')
Product.find((err, product) => {
    console.log('Checking data....')
    if (product.length) {
        console.log(product)
        console.log('Data valid')
        return
    }
    console.log('Initialize data')
    new Product({
        name: 'Samsung Galaxy S22 Ultra 5G',
        price: 1200,
        description: "Samsung Galaxy S22 Ultra 256GB - chiếc điện thoại Galaxy S đầu tiên sở hữu bút S Pen trong thân máy, được cung cấp sức mạnh bởi CPU đến từ Qualcomm, sở hữu thiết kế sang trọng, màn hình có nhiều cải tiến cùng cụm camera zoom 100x. ",
        imagePath: 'Galaxy-S22-Ultra-Green.jpg'
    }).save()
    new Product({
        name: 'Iphone 11 64GB',
        price: 900,
        description: "Apple đã chính thức trình làng bộ 3 siêu phẩm iPhone 11, trong đó phiên bản iPhone 11 64GB có mức giá rẻ nhất nhưng vẫn được nâng cấp mạnh mẽ như iPhone Xr ra mắt trước đó.",
        imagePath: 'iphone-xi-do-600x600.jpg'
    }).save()
    new Product({
        name: 'Điện thoại OPPO Reno6 Z 5G',
        price: 400,
        description: "Reno6 Z 5G đến từ nhà OPPO với hàng loạt sự nâng cấp và cải tiến không chỉ ngoại hình bên ngoài mà còn sức mạnh bên trong. Đặc biệt, chiếc điện thoại được hãng đánh giá chuyên gia chân dung bắt trọn mọi cảm xúc chân thật nhất, đây chắc chắn sẽ là một 'siêu phẩm' mà bạn không thể bỏ qua.",
        imagePath: 'oppo-reno6-z-5g-aurora-1-600x600.jpg'
    }).save()
    new Product({
        name: 'Realme C35',
        price: 150,
        description: "Realme C35 thuộc phân khúc giá rẻ được nhà Realme cho ra mắt với thiết kế trẻ trung, dung lượng pin lớn cùng camera hỗ trợ nhiều tính năng. Đây sẽ là thiết bị liên lạc, giải trí và làm việc ổn định,… cho các nhu cầu sử dụng của bạn",
        imagePath: 'realme-c35-black-thumb-600x600.jpg'
    }).save()
    new Product({
        name: 'Điện thoại Xiaomi 11T 5G 256GB ',
        price: 149,
        description: "Xiaomi 11T 5G sở hữu màn hình AMOLED, viên pin siêu khủng cùng camera độ phân giải 108 MP, chiếc smartphone này của Xiaomi sẽ đáp ứng mọi nhu cầu sử dụng của bạn, từ giải trí đến làm việc đều vô cùng mượt mà.",
        imagePath: 'Xiaomi-11T-Grey-600x600.jpg'
    }).save()
})



