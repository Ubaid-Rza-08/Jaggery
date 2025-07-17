package com.naresh.email;
import com.naresh.kafka.order.OrderConfirmation;
import com.naresh.kafka.order.OrderConfirmationDTO;
import com.naresh.kafka.order.OrderNotificationRepository;
import com.naresh.kafka.order.PurchaseResponse;
import com.naresh.kafka.payment.PaymentConfirmation;
import com.naresh.kafka.payment.PaymentConfirmationDTO;
import com.naresh.kafka.payment.PaymentNotificationRepository;
import com.naresh.mapper.OrderMapper;
import com.naresh.mapper.PaymentMapper;
import com.naresh.notification.Notification;
import com.naresh.notification.NotificationRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import java.util.*;
import static com.naresh.email.EmailTemplates.ORDER_CONFIRMATION;
import static com.naresh.email.EmailTemplates.PAYMENT_CONFIRMATION;
@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final NotificationRepository notificationRepository;
    private final PaymentMapper paymentMapper;
    private final OrderMapper orderMapper;
    private final PaymentNotificationRepository paymentNotificationRepository;
    private final OrderNotificationRepository orderNotificationRepository;
     @Value("${email.setFrom}")
     private String setFrom;
    @Transactional
    public void sendOrderConfirmation(OrderConfirmationDTO orderConfirmationDTO) throws MessagingException {
        OrderConfirmation orderConfirmation=new OrderConfirmation();
        orderConfirmation.setEmail(orderConfirmationDTO.email());
        orderConfirmation.setOrderReference(orderConfirmationDTO.orderReference());
        orderConfirmation.setTotalAmount(orderConfirmationDTO.totalAmount());
        List<PurchaseResponse> prList=new ArrayList<>();
for(PurchaseResponse pr:orderConfirmationDTO.products()){
    PurchaseResponse purchase=new PurchaseResponse();
    purchase.setOrderConfirmation(orderConfirmation);
    purchase.setName(pr.getName());
    purchase.setPrice(pr.getPrice());
    purchase.setQuantity(pr.getQuantity());
    purchase.setDescription(pr.getDescription());
    prList.add(purchase);
}
orderConfirmation.setProducts(prList);
        Optional<Notification> notificationOpt =
                notificationRepository.findByEmail(orderConfirmationDTO.email());
        if (notificationOpt.isPresent()) {
            Notification storedNotification = notificationOpt.get();
            orderConfirmation.setNotification(storedNotification);
            storedNotification.getOrderConfirmations().add(orderConfirmation);
            notificationRepository.save(storedNotification);
        } else {
            Notification newNotification = new Notification();
            newNotification.setEmail(orderConfirmation.getEmail());
            newNotification.setOrderConfirmations(new ArrayList<>()); // if not done in constructor
            newNotification.getOrderConfirmations().add(orderConfirmation);
            orderConfirmation.setNotification(newNotification);
            notificationRepository.save(newNotification);
        }
        final String templateName=ORDER_CONFIRMATION.getTemplate();
        Map<String,Object> variables=new HashMap<>();
        variables.put("customerName",orderConfirmationDTO.name());
        variables.put("amount",orderConfirmation.getTotalAmount());
        variables.put("orderReference",orderConfirmation.getOrderReference());
        variables.put("products",orderConfirmation.getProducts());
        Context context=new Context();
        context.setVariables(variables);
        MimeMessage mimeMessage=mailSender.createMimeMessage();
        MimeMessageHelper message=new MimeMessageHelper(mimeMessage,MimeMessageHelper.MULTIPART_MODE_MIXED);
        message.setFrom(setFrom);
        message.setTo(orderConfirmation.getEmail());
        message.setSubject(ORDER_CONFIRMATION.getSubject());
        try{
            String htmlTemplate=templateEngine.process(templateName,context);
            message.setText(htmlTemplate,true);
            mailSender.send(mimeMessage);
            log.info("Email Successfylly sent with template %s {}",orderConfirmation.getEmail());
        }catch (MessagingException e){
            log.warn("WARNING - Cannot send Email to {} ",orderConfirmation.getEmail());
     throw new RuntimeException(e);
        }
    }
    @Transactional
    public void sendPaymentConfirmation(PaymentConfirmationDTO paymentConfirmationDTO) throws MessagingException {
        PaymentConfirmation paymentConfirmation = paymentMapper.toPaymentConfirmation(paymentConfirmationDTO);
          Optional<Notification> notification=notificationRepository.findByEmail(paymentConfirmation.getEmail());

          if(notification.isPresent()){
              Notification StoredNotification=notification.get();
              StoredNotification.getPaymentConfirmations().add(paymentConfirmation);
              notificationRepository.save(StoredNotification);
          }
          else {
              Notification newNotification=new Notification();
              newNotification.setEmail(paymentConfirmation.getEmail());
              newNotification.getPaymentConfirmations().add(paymentConfirmation);
              notificationRepository.save(newNotification);
          }
        final String templateName = PAYMENT_CONFIRMATION.getTemplate();
        Map<String, Object> variables = new HashMap<>();
        variables.put("customerName",paymentConfirmation.getName());
        variables.put("amount", paymentConfirmation.getTotalAmount());
        variables.put("orderReference",paymentConfirmation.getOrderReference());
        Context context = new Context();
        context.setVariables(variables);
       MimeMessage mimeMessage=mailSender.createMimeMessage();
       MimeMessageHelper message=new MimeMessageHelper(mimeMessage,MimeMessageHelper.MULTIPART_MODE_MIXED);
       message.setFrom(setFrom);
       message.setTo(paymentConfirmation.getEmail());
       message.setSubject(PAYMENT_CONFIRMATION.getSubject());
        try{
            String htmlTemplate=templateEngine.process(templateName,context);
            message.setText(htmlTemplate,true);
            mailSender.send(mimeMessage);
            log.info("Email Successfylly sent with template  {}",paymentConfirmation.getEmail());
        }catch (MessagingException e){
            log.warn("WARNING - cannot send Email to {} ",paymentConfirmation.getEmail());
            throw new RuntimeException(e);
        }
       ;
    }

}
